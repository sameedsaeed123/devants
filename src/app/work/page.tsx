import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { CtaSection } from "@/components/sections/cta";
import { ProjectGrid } from "@/components/work/project-grid";
import { getDistinctCategories, getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies from DevAnts — web platforms, mobile apps, automation and infrastructure work, with the problem, the approach and the measured outcome for each.",
};

export default async function WorkPage() {
  const [projects, categories] = await Promise.all([getProjects(), getDistinctCategories()]);

  return (
    <>
      <header className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-teal-500/[0.10] blur-3xl" />

        <div className="container-page relative">
          <Reveal variant="fade">
            <Eyebrow>Our work</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl text-display-l font-bold">
              Products in production,
              <br />
              <span className="text-gradient-brand">not concepts on Dribbble</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every project below shipped and is still running. Each case study covers what the
              client arrived with, the decisions we made and why, and what measurably changed
              afterwards — including the parts that took longer than we planned.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="pb-section">
        <div className="container-page">
          {projects.length > 0 ? (
            <ProjectGrid projects={projects} categories={categories} />
          ) : (
            <p className="rounded-card border border-dashed border-border py-24 text-center text-muted-foreground">
              No projects published yet. Add your first from{" "}
              <Link href="/admin" className="text-teal-300 underline underline-offset-4">
                the admin dashboard
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
