import { db } from "@/lib/db";

/** Published projects, ordered for the work grid. */
export async function getProjects() {
  return db.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getFeaturedProjects(take = 4) {
  return db.project.findMany({
    where: { published: true, featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take,
  });
}

export async function getProjectBySlug(slug: string) {
  return db.project.findFirst({ where: { slug, published: true } });
}

/** Slugs of published projects, for generateStaticParams and the testimonial form. */
export async function getProjectIndex() {
  return db.project.findMany({
    where: { published: true },
    select: { slug: true, title: true },
    orderBy: { title: "asc" },
  });
}

/** Only APPROVED testimonials are ever returned to the public site. */
export async function getApprovedTestimonials() {
  return db.testimonial.findMany({
    where: { status: "APPROVED" },
    orderBy: [{ featured: "desc" }, { submittedAt: "desc" }],
  });
}

export async function getDistinctCategories() {
  const rows = await db.project.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return rows.map((row) => row.category);
}

/** Admin-only: everything, regardless of status. */
export async function getAdminData() {
  const [pending, reviewed, projects, inquiries] = await Promise.all([
    db.testimonial.findMany({ where: { status: "PENDING" }, orderBy: { submittedAt: "desc" } }),
    db.testimonial.findMany({
      where: { status: { in: ["APPROVED", "REJECTED"] } },
      orderBy: { reviewedAt: "desc" },
    }),
    db.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] }),
    db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);
  return { pending, reviewed, projects, inquiries };
}
