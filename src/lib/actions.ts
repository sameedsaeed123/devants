"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, destroySession, passwordMatches, requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import type { FormState } from "@/lib/form-state";
import { slugify } from "@/lib/utils";

/** Flatten a ZodError into { fieldName: firstMessage }. */
function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/* ==========================================================================
   Public: testimonial submission
   ========================================================================== */

const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  role: z.string().trim().min(2, "Your role helps readers place the review"),
  company: z.string().trim().min(2, "Company or product name, please"),
  email: z.union([z.literal(""), z.string().trim().email("That email doesn't look right")]),
  quote: z
    .string()
    .trim()
    .min(40, "A little more detail, please — at least 40 characters")
    .max(1200, "Keep it under 1200 characters"),
  rating: z.coerce.number().int().min(1).max(5),
  projectSlug: z.string().trim(),
});

export async function submitTestimonial(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    email: formData.get("email") ?? "",
    quote: formData.get("quote"),
    rating: formData.get("rating") ?? 5,
    projectSlug: formData.get("projectSlug") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  await db.testimonial.create({
    data: { ...parsed.data, status: "PENDING" },
  });

  revalidatePath("/admin");

  return {
    ok: true,
    message:
      "Thank you — that means a lot. Your review is with our team and will appear on the site once it's approved.",
  };
}

/* ==========================================================================
   Public: project enquiry
   ========================================================================== */

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  email: z.string().trim().email("We need a valid email to reply"),
  company: z.string().trim(),
  budget: z.string().trim(),
  message: z
    .string()
    .trim()
    .min(20, "A couple of sentences about the project, please")
    .max(4000, "Keep it under 4000 characters"),
});

export async function submitInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    budget: formData.get("budget") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const services = formData.getAll("services").map(String).join(",");

  await db.inquiry.create({ data: { ...parsed.data, services } });
  revalidatePath("/admin");

  return {
    ok: true,
    message: "Got it. You'll hear back from a human within one working day.",
  };
}

/* ==========================================================================
   Admin: auth
   ========================================================================== */

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return { ok: false, message: "Enter the admin password.", errors: { password: "Required" } };
  }
  if (!passwordMatches(password)) {
    return { ok: false, message: "Incorrect password.", errors: { password: "Incorrect password" } };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ==========================================================================
   Admin: testimonial moderation
   ========================================================================== */

export async function approveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.testimonial.update({
    where: { id },
    data: { status: "APPROVED", reviewedAt: new Date() },
  });
  revalidatePath("/admin");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

export async function rejectTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.testimonial.update({
    where: { id },
    data: {
      status: "REJECTED",
      reviewedAt: new Date(),
      adminNote: String(formData.get("adminNote") ?? ""),
    },
  });
  revalidatePath("/admin");
  revalidatePath("/testimonials");
}

export async function toggleTestimonialFeatured(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const current = await db.testimonial.findUniqueOrThrow({ where: { id } });
  await db.testimonial.update({ where: { id }, data: { featured: !current.featured } });
  revalidatePath("/admin");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await db.testimonial.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin");
  revalidatePath("/testimonials");
}

/* ==========================================================================
   Admin: project CRUD
   ========================================================================== */

const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  slug: z.string().trim(),
  subtitle: z.string().trim().min(2, "Add a short subtitle"),
  category: z.string().trim().min(2, "Category is required"),
  client: z.string().trim().min(1, "Client name is required"),
  year: z.string().trim().min(4, "Year is required"),
  summary: z.string().trim().min(10, "Add a one-line hook"),
  body: z.string().trim(),
  challenge: z.string().trim(),
  solution: z.string().trim(),
  outcomes: z.string().trim(),
  stack: z.string().trim(),
  coverImage: z.string().trim().url("Cover image must be a full URL"),
  gallery: z.string().trim(),
  liveUrl: z.union([z.literal(""), z.string().trim().url("Live URL must be a full URL")]),
  order: z.coerce.number().int(),
  featured: z.coerce.boolean(),
  published: z.coerce.boolean(),
});

function readProjectForm(formData: FormData) {
  return {
    title: formData.get("title"),
    slug: formData.get("slug") ?? "",
    subtitle: formData.get("subtitle"),
    category: formData.get("category"),
    client: formData.get("client"),
    year: formData.get("year"),
    summary: formData.get("summary"),
    body: formData.get("body") ?? "",
    challenge: formData.get("challenge") ?? "",
    solution: formData.get("solution") ?? "",
    outcomes: formData.get("outcomes") ?? "",
    stack: formData.get("stack") ?? "",
    coverImage: formData.get("coverImage"),
    gallery: formData.get("gallery") ?? "",
    liveUrl: formData.get("liveUrl") ?? "",
    order: formData.get("order") ?? 0,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };
}

export async function upsertProject(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(readProjectForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: fieldErrors(parsed.error),
    };
  }

  const data = { ...parsed.data, slug: parsed.data.slug || slugify(parsed.data.title) };
  const id = String(formData.get("id") ?? "");

  try {
    if (id) {
      await db.project.update({ where: { id }, data });
    } else {
      await db.project.create({ data });
    }
  } catch {
    return {
      ok: false,
      message: `A project with the slug "${data.slug}" already exists. Pick a different slug.`,
      errors: { slug: "Already taken" },
    };
  }

  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath(`/work/${data.slug}`);
  revalidatePath("/");

  return { ok: true, message: id ? "Project updated." : `“${data.title}” added to your work.` };
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  await db.project.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath("/");
}

export async function toggleProjectPublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const current = await db.project.findUniqueOrThrow({ where: { id } });
  await db.project.update({ where: { id }, data: { published: !current.published } });
  revalidatePath("/admin");
  revalidatePath("/work");
  revalidatePath("/");
}

export async function toggleProjectFeatured(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const current = await db.project.findUniqueOrThrow({ where: { id } });
  await db.project.update({ where: { id }, data: { featured: !current.featured } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function markInquiryHandled(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const current = await db.inquiry.findUniqueOrThrow({ where: { id } });
  await db.inquiry.update({ where: { id }, data: { handled: !current.handled } });
  revalidatePath("/admin");
}
