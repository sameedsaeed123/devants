import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/section-heading";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with DevAnts. Tell us what you're building and you'll hear back from an engineer within one working day.",
};

const faqs = [
  {
    question: "What happens after I send this?",
    answer:
      "An engineer — not a salesperson — reads it and replies within one working day. If it looks like a fit, we'll suggest a 45-minute call. If it isn't, we'll say so and usually point you at someone better suited.",
  },
  {
    question: "Do you work with early-stage founders?",
    answer:
      "Often. What matters is that you've decided what to build and why, not how much funding you've raised. If you're still exploring, a paid two-week discovery sprint is usually a better first step than a full build.",
  },
  {
    question: "Can you take over an existing codebase?",
    answer:
      "Yes, and it's a meaningful share of our work. We start with a read-only audit and a written assessment before touching anything, so you know what you're dealing with before committing budget.",
  },
  {
    question: "How do you charge?",
    answer:
      "Fixed-price phases for defined scope, monthly retainers for ongoing work and team augmentation. We invoice at agreed milestones, never surprise hourly overages.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <header className="relative overflow-hidden pt-36 pb-16 lg:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.28] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-teal-500/[0.10] blur-3xl" />

        <div className="container-page relative">
          <Reveal variant="fade">
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-display-l font-bold">
              Tell us the messy version
              <br />
              <span className="text-gradient-brand">— we&apos;ll bring the structure</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              You don&apos;t need a spec or a wireframe. A paragraph about what&apos;s not working
              is plenty to start from.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="pb-section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            {/* Left: direct contact + FAQ */}
            <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <Reveal variant="right">
                <div className="space-y-5 rounded-card border border-border bg-surface p-7">
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-start gap-3 transition-colors hover:text-teal-300"
                  >
                    <Mail className="mt-0.5 size-5 shrink-0 text-teal-400" aria-hidden="true" />
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Email
                      </span>
                      <span className="mt-1 block text-sm text-foreground group-hover:text-teal-300">
                        {site.email}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-teal-400" aria-hidden="true" />
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Where we are
                      </span>
                      <span className="mt-1 block text-sm text-foreground">{site.location}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-teal-400" aria-hidden="true" />
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Response time
                      </span>
                      <span className="mt-1 block text-sm text-foreground">
                        Within one working day
                      </span>
                    </span>
                  </div>

                  <div className="border-t border-border pt-5">
                    <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Elsewhere
                    </span>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:border-teal-400/50 hover:text-foreground"
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="right" delay={0.1}>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Before you ask
                </h2>
                <dl className="mt-5 space-y-5">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="border-t border-border pt-5">
                      <dt className="text-sm font-medium text-foreground">{faq.question}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Right: form */}
            <Reveal delay={0.08}>
              <div className="rounded-card border border-border bg-surface p-7 sm:p-9">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Start a project
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Five fields. Two minutes. A real reply.
                </p>
                <div className="mt-8">
                  <ContactForm preselectedService={service} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
