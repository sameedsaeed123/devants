"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import {
  deleteProject,
  toggleProjectFeatured,
  toggleProjectPublished,
  upsertProject,
} from "@/lib/actions";
import { emptyState } from "@/lib/form-state";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { TECH } from "@/lib/tech";
import { cn } from "@/lib/utils";

export type AdminProject = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  year: string;
  summary: string;
  body: string;
  challenge: string;
  solution: string;
  outcomes: string;
  stack: string;
  coverImage: string;
  gallery: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  published: boolean;
};

const emptyProject: AdminProject = {
  id: "",
  slug: "",
  title: "",
  subtitle: "",
  category: "",
  client: "",
  year: String(new Date().getFullYear()),
  summary: "",
  body: "",
  challenge: "",
  solution: "",
  outcomes: "",
  stack: "",
  coverImage: "",
  gallery: "",
  liveUrl: "",
  featured: false,
  order: 0,
  published: true,
};

function ProjectForm({
  project,
  onDone,
}: {
  project: AdminProject;
  onDone: () => void;
}) {
  const [state, formAction, pending] = useActionState(upsertProject, emptyState);
  const isNew = !project.id;

  if (state.ok) {
    return (
      <div className="rounded-card border border-success/30 bg-success/[0.06] p-6 text-center">
        <p className="text-sm text-success">{state.message}</p>
        <Button type="button" size="sm" variant="outline" className="mt-4" onClick={onDone}>
          Back to list
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6 rounded-card border border-border bg-surface p-7">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {isNew ? "Add a project" : `Editing “${project.title}”`}
        </h3>
        <Button type="button" size="sm" variant="ghost" onClick={onDone}>
          <X />
          Cancel
        </Button>
      </div>

      <input type="hidden" name="id" value={project.id} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" error={state.errors?.title}>
          <Input id="title" name="title" defaultValue={project.title} required error={!!state.errors?.title} />
        </Field>

        <Field
          label="Slug"
          hint="optional"
          htmlFor="slug"
          error={state.errors?.slug}
          help="Leave blank to generate from the title."
        >
          <Input id="slug" name="slug" defaultValue={project.slug} error={!!state.errors?.slug} />
        </Field>

        <Field label="Subtitle" htmlFor="subtitle" error={state.errors?.subtitle} help="e.g. “Fintech · Mobile app”">
          <Input id="subtitle" name="subtitle" defaultValue={project.subtitle} required error={!!state.errors?.subtitle} />
        </Field>

        <Field label="Category" htmlFor="category" error={state.errors?.category} help="Used by the filter tabs on /work">
          <Input id="category" name="category" defaultValue={project.category} placeholder="Web Platform" required error={!!state.errors?.category} />
        </Field>

        <Field label="Client" htmlFor="client" error={state.errors?.client}>
          <Input id="client" name="client" defaultValue={project.client} required error={!!state.errors?.client} />
        </Field>

        <Field label="Year" htmlFor="year" error={state.errors?.year}>
          <Input id="year" name="year" defaultValue={project.year} required error={!!state.errors?.year} />
        </Field>
      </div>

      <Field label="Summary" htmlFor="summary" error={state.errors?.summary} help="One-line hook shown on hover in the grid.">
        <Textarea id="summary" name="summary" rows={2} defaultValue={project.summary} required error={!!state.errors?.summary} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="The challenge" htmlFor="challenge" help="What the client arrived with.">
          <Textarea id="challenge" name="challenge" rows={4} defaultValue={project.challenge} />
        </Field>
        <Field label="What we built" htmlFor="solution" help="The approach and the decisions.">
          <Textarea id="solution" name="solution" rows={4} defaultValue={project.solution} />
        </Field>
      </div>

      <Field label="How it went" htmlFor="body" help="Long-form body. Separate paragraphs with a blank line.">
        <Textarea id="body" name="body" rows={6} defaultValue={project.body} />
      </Field>

      <Field label="Outcomes" htmlFor="outcomes" help="Comma-separated. e.g. “Checkout 3.2x faster, +41% retention”">
        <Textarea id="outcomes" name="outcomes" rows={2} defaultValue={project.outcomes} />
      </Field>

      <Field
        label="Tech stack"
        htmlFor="stack"
        error={state.errors?.stack}
        help={`Comma-separated slugs. Valid: ${Object.keys(TECH).slice(0, 12).join(", ")}…`}
      >
        <Textarea id="stack" name="stack" rows={2} defaultValue={project.stack} placeholder="nextjs,typescript,node,postgres,docker" />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Cover image URL" htmlFor="coverImage" error={state.errors?.coverImage}>
          <Input id="coverImage" name="coverImage" type="url" defaultValue={project.coverImage} required error={!!state.errors?.coverImage} placeholder="https://images.unsplash.com/…" />
        </Field>
        <Field label="Live URL" hint="optional" htmlFor="liveUrl" error={state.errors?.liveUrl}>
          <Input id="liveUrl" name="liveUrl" type="url" defaultValue={project.liveUrl} error={!!state.errors?.liveUrl} />
        </Field>
      </div>

      <Field label="Gallery URLs" hint="optional" htmlFor="gallery" help="Comma-separated image URLs for the case-study gallery.">
        <Textarea id="gallery" name="gallery" rows={2} defaultValue={project.gallery} />
      </Field>

      <div className="flex flex-wrap items-center gap-6 border-t border-border pt-6">
        <Field label="Sort order" htmlFor="order" className="w-32">
          <Input id="order" name="order" type="number" defaultValue={project.order} />
        </Field>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
          <input type="checkbox" name="featured" defaultChecked={project.featured} className="size-4 accent-teal-400" />
          Featured on homepage
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
          <input type="checkbox" name="published" defaultChecked={project.published} className="size-4 accent-teal-400" />
          Published
        </label>

        <Button type="submit" size="lg" className="ml-auto" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Saving…
            </>
          ) : (
            <>
              <Save />
              {isNew ? "Create project" : "Save changes"}
            </>
          )}
        </Button>
      </div>

      {state.message && !state.ok ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/[0.08] px-4 py-3 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

export function ProjectManager({ projects }: { projects: AdminProject[] }) {
  const [editing, setEditing] = useState<AdminProject | null>(null);

  if (editing) {
    return <ProjectForm project={editing} onDone={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Projects</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {projects.length} total · {projects.filter((p) => p.published).length} published ·{" "}
            {projects.filter((p) => p.featured).length} featured
          </p>
        </div>
        <Button type="button" onClick={() => setEditing(emptyProject)}>
          <Plus />
          Add project
        </Button>
      </div>

      {projects.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-wrap items-center gap-4 rounded-card border border-border bg-surface p-4"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border">
                {project.coverImage ? (
                  <Image src={project.coverImage} alt="" fill sizes="96px" className="object-cover" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  {project.featured ? (
                    <span className="rounded-full border border-teal-400/40 bg-teal-400/[0.08] px-2 py-0.5 text-[11px] uppercase tracking-wide text-teal-300">
                      Featured
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[11px] uppercase tracking-wide",
                      project.published
                        ? "border-success/40 bg-success/[0.08] text-success"
                        : "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {project.published ? "Live" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {project.category} · {project.client} · {project.year} ·{" "}
                  <code className="text-teal-300/80">/work/{project.slug}</code>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <Button type="button" size="sm" variant="outline" onClick={() => setEditing(project)}>
                  <Pencil />
                  Edit
                </Button>

                <form action={toggleProjectFeatured}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button type="submit" size="sm" variant="ghost" aria-label="Toggle featured">
                    <Star className={project.featured ? "fill-teal-400 text-teal-400" : ""} />
                  </Button>
                </form>

                <form action={toggleProjectPublished}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button type="submit" size="sm" variant="ghost" aria-label="Toggle published">
                    {project.published ? <Eye /> : <EyeOff />}
                  </Button>
                </form>

                <Link
                  href={`/work/${project.slug}`}
                  className="rounded-full px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-teal-300"
                >
                  View
                </Link>

                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button type="submit" size="sm" variant="ghost" aria-label="Delete project">
                    <Trash2 />
                  </Button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-card border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No projects yet. Add your first one — it appears on /work immediately.
        </p>
      )}
    </div>
  );
}
