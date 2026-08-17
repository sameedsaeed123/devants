import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { CtaSection } from "@/components/sections/cta";
import { TechStack } from "@/components/tech-badge";
import { ProjectCard } from "@/components/work/project-grid";
import { ButtonLink } from "@/components/ui/button";
import { getProjectBySlug, getProjectIndex, getProjects } from "@/lib/queries";
import { splitList } from "@/lib/utils";

export async function generateStaticParams() {
  const projects = await getProjectIndex();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const all = await getProjects();
  const related = all.filter((item) => item.slug !== project.slug).slice(0, 2);

  const outcomes = splitList(project.outcomes);
  const gallery = splitList(project.gallery);
  const paragraphs = project.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      {/* --- Header ---------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-32 pb-12 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.24] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_60%)]" />

        <div className="container-page relative">
          <Link
            href="/work"
            data-cursor="Back"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-teal-300"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>

          <Reveal variant="fade" className="mt-10">
            <Eyebrow>{project.category}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-display-l font-bold">{project.title}</h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Client
                </dt>
                <dd className="mt-2 text-sm text-foreground">{project.client}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Year</dt>
                <dd className="mt-2 font-mono text-sm text-foreground">{project.year}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Discipline
                </dt>
                <dd className="mt-2 text-sm text-foreground">{project.subtitle}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Live</dt>
                <dd className="mt-2 text-sm">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 text-teal-300 underline-offset-4 hover:underline"
                    >
                      Visit
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Private / NDA</span>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      {/* --- Cover ----------------------------------------------------------- */}
      <Reveal variant="fade" className="container-page">
        <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border">
          <Image
            src={project.coverImage}
            alt={`${project.title} interface`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
        </div>
      </Reveal>

      {/* --- Body ------------------------------------------------------------ */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div className="space-y-14">
              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  The challenge
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.challenge}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  What we built
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.solution}
                </p>
              </Reveal>

              {paragraphs.length > 0 ? (
                <Reveal>
                  <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    How it went
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </div>

            {/* Sidebar: outcomes + stack */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              {outcomes.length > 0 ? (
                <Reveal variant="right">
                  <div className="rounded-card border border-teal-400/20 bg-teal-400/[0.04] p-7">
                    <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-teal-300">
                      Outcomes
                    </h2>
                    <ul className="mt-5 space-y-3.5">
                      {outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3 text-sm">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-teal-400"
                            aria-hidden="true"
                          />
                          <span className="text-foreground/90">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal variant="right" delay={0.08}>
                <div className="rounded-card border border-border bg-surface p-7">
                  <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Built with
                  </h2>
                  <div className="mt-5">
                    <TechStack slugs={splitList(project.stack)} size="sm" />
                  </div>
                </div>
              </Reveal>

              <Reveal variant="right" delay={0.16}>
                <div className="rounded-card border border-border bg-surface p-7">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Similar problem?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We&apos;ve probably solved a version of this before. Tell us where you&apos;re
                    stuck and we&apos;ll say honestly whether we can help.
                  </p>
                  <ButtonLink href="/contact" size="sm" className="mt-5" data-cursor="Let's talk">
                    Start a conversation
                    <ArrowUpRight />
                  </ButtonLink>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* --- Gallery ----------------------------------------------------- */}
          {gallery.length > 0 ? (
            <div className="mt-20 grid gap-5 sm:grid-cols-2">
              {gallery.map((image, index) => (
                <Reveal
                  key={image}
                  variant="depth"
                  delay={index * 0.08}
                  className={index % 3 === 0 ? "sm:col-span-2" : ""}
                >
                  <div
                    className={`relative overflow-hidden rounded-card border border-border ${
                      index % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} — screen ${index + 1}`}
                      fill
                      sizes={index % 3 === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* --- Related --------------------------------------------------------- */}
      {related.length > 0 ? (
        <section className="border-t border-border py-section">
          <div className="container-page">
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Next projects
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {related.map((item, index) => (
                <Reveal key={item.id} as="li" variant="depth" delay={index * 0.08}>
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
