import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  BrainCircuit,
  Compass,
  Globe,
  Repeat,
  ServerCog,
  Smartphone,
} from "lucide-react";

export type Capability = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  /** Short label for nav, chips and the contact form */
  name: string;
  /** Full headline used on the services page */
  headline: string;
  icon: LucideIcon;
  /** One paragraph a non-technical buyer can read and understand */
  intro: string;
  /** The pain this service actually removes */
  problem: string;
  /** What lands in the client's hands */
  deliverables: string[];
  /** Concrete sub-offerings */
  capabilities: Capability[];
  /** Tech slugs from src/lib/tech.ts */
  stack: string[];
  /** Typical engagement shape */
  timeline: string;
  startingAt: string;
};

export const services: Service[] = [
  {
    slug: "web-platforms",
    name: "Web Platforms",
    headline: "Web platforms that hold up under real traffic",
    icon: Globe,
    intro:
      "Most agency websites are brochures. We build the other kind — dashboards, marketplaces, booking systems, portals, SaaS products. The sort of thing where a slow query at 2pm costs someone money, so architecture matters more than the hero animation.",
    problem:
      "You have a product idea, a spreadsheet holding the business together, or a legacy app nobody wants to touch. Every new feature takes three weeks and breaks two other things.",
    deliverables: [
      "Production app deployed on your infrastructure, not ours",
      "Typed API with documented endpoints and seed data",
      "Component library your future hires can actually extend",
      "Admin panel so your team stops asking developers for data",
      "Handover session, repo access and a written architecture note",
    ],
    capabilities: [
      {
        title: "MERN & Next.js products",
        body: "React and Next.js on the front, Node/Express or Next server actions behind it, MongoDB or Postgres underneath. Server components where they earn their keep, client state only where the user actually interacts.",
      },
      {
        title: "Laravel & PHP systems",
        body: "For teams who want boring, provable stability: Eloquent models, queued jobs, Blade or Inertia front-ends, Horizon for background work. Excellent fit for billing, inventory and multi-tenant admin systems.",
      },
      {
        title: ".NET enterprise back-ends",
        body: "ASP.NET Core APIs with clean architecture, EF Core, and role-based auth that survives a security review. What we reach for when the client is a bank, an insurer or anyone with a compliance team.",
      },
      {
        title: "Django & Flask services",
        body: "Django when you want batteries and an admin out of the box; Flask or FastAPI when you want a lean service that does one job. Both pair naturally with data or ML workloads.",
      },
      {
        title: "Headless commerce",
        body: "Shopify or a custom cart with Stripe/Razorpay, wired to a front-end you control. Checkout that converts on a 3G connection in a lift.",
      },
      {
        title: "Real-time features",
        body: "Live dashboards, collaborative editing, chat, notifications and presence with WebSockets or Socket.IO — plus the reconnection logic everyone forgets to write.",
      },
    ],
    stack: [
      "nextjs",
      "react",
      "typescript",
      "node",
      "express",
      "laravel",
      "php",
      "dotnet",
      "csharp",
      "django",
      "flask",
      "python",
      "mongodb",
      "postgres",
      "mysql",
      "redis",
      "graphql",
      "prisma",
      "tailwind",
      "socketio",
    ],
    timeline: "6–14 weeks for a v1 platform",
    startingAt: "$8,000",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    headline: "One codebase, two stores, no compromise on feel",
    icon: Smartphone,
    intro:
      "Cross-platform used to mean 'worse on both'. It doesn't any more. We build in Flutter and React Native, drop to native modules when the platform demands it, and ship to both stores from a single pipeline — including the review paperwork nobody warns you about.",
    problem:
      "You need iOS and Android, you don't have the budget for two native teams, and the last quote you got treated app store submission as someone else's problem.",
    deliverables: [
      "Signed release builds for App Store and Google Play",
      "Store listings, screenshots and privacy declarations submitted",
      "Offline-first data layer with conflict handling",
      "Push notifications, deep links and analytics wired in",
      "CI pipeline that builds and distributes on every merge",
    ],
    capabilities: [
      {
        title: "Flutter",
        body: "Our default for design-forward apps. One Dart codebase, 60fps custom UI, and a widget layer that lets us match a Figma file exactly instead of arguing with platform defaults.",
      },
      {
        title: "React Native & Expo",
        body: "The right pick when you already have a React web app and want to share logic, types and developers across both. Expo's build service and OTA updates keep release cycles short.",
      },
      {
        title: "Native modules",
        body: "Swift and Kotlin bridges for Bluetooth, background location, biometrics, payment SDKs, camera pipelines — the parts that cross-platform frameworks can't reach on their own.",
      },
      {
        title: "Offline-first architecture",
        body: "Local database as the source of truth, background sync with a real conflict-resolution strategy. Built so the app works on a train, in a warehouse, or on a site with no signal.",
      },
      {
        title: "Store release management",
        body: "Provisioning profiles, signing keys, staged rollouts, phased releases and the rejection appeals. We've read the review guidelines so you don't have to.",
      },
    ],
    stack: [
      "flutter",
      "dart",
      "reactnative",
      "react",
      "expo",
      "swift",
      "kotlin",
      "android",
      "ios",
      "firebase",
      "supabase",
      "typescript",
    ],
    timeline: "8–16 weeks to first store release",
    startingAt: "$12,000",
  },
  {
    slug: "devops-cloud",
    name: "DevOps & Cloud",
    headline: "Infrastructure that a junior can deploy on a Friday",
    icon: ServerCog,
    intro:
      "A good deployment is boring. It runs on a merge, it tells you when it breaks, and it rolls back without a phone call. We containerise what you have, script the environment so it's reproducible, and put monitoring in front of it — then teach your team to drive it.",
    problem:
      "Deploys happen over SSH from one person's laptop. There's no staging environment, nobody knows which server the cron job lives on, and the last outage was found by a customer.",
    deliverables: [
      "Dockerised services with a reproducible local environment",
      "Infrastructure as code — no clicking around a console",
      "CI/CD pipeline with automated tests and staged rollout",
      "Dashboards, log aggregation and alerting that reaches a human",
      "Runbook covering deploy, rollback, restore and on-call",
    ],
    capabilities: [
      {
        title: "Containerisation",
        body: "Multi-stage Docker builds that keep images small, plus Compose for local parity so 'works on my machine' stops being an excuse.",
      },
      {
        title: "Kubernetes & orchestration",
        body: "Helm charts, autoscaling, health probes and resource limits for services that genuinely need to scale horizontally. We'll also tell you honestly when you don't need Kubernetes yet.",
      },
      {
        title: "Infrastructure as code",
        body: "Terraform for cloud resources, Ansible for configuration. Your whole environment described in a repo, reviewable in a pull request, rebuildable from scratch.",
      },
      {
        title: "CI/CD pipelines",
        body: "GitHub Actions or Jenkins running lint, type-check, tests and build on every push, then deploying to staging automatically and production on approval.",
      },
      {
        title: "Observability",
        body: "Prometheus metrics, Grafana dashboards, Sentry for exceptions and structured logs you can actually search during an incident.",
      },
      {
        title: "Cost & performance audits",
        body: "A written review of what you're spending, what's over-provisioned, and where the latency is really coming from. Usually pays for itself in the first quarter.",
      },
    ],
    stack: [
      "docker",
      "kubernetes",
      "terraform",
      "ansible",
      "githubactions",
      "jenkins",
      "aws",
      "gcp",
      "cloudflare",
      "digitalocean",
      "vercel",
      "nginx",
      "linux",
      "prometheus",
      "grafana",
      "sentry",
      "redis",
    ],
    timeline: "3–8 weeks, or ongoing retainer",
    startingAt: "$5,000",
  },
  {
    slug: "automation",
    name: "Automation",
    headline: "Delete the work nobody should be doing by hand",
    icon: Repeat,
    intro:
      "Every company accumulates manual busywork: copying leads between tools, chasing approvals, rebuilding the same report every Monday. We map those flows, automate the mechanical parts, and leave the judgement calls to people.",
    problem:
      "Someone on your team spends a day a week moving data between systems. It's invisible on the P&L and it's the first thing that breaks when they take leave.",
    deliverables: [
      "Documented map of the process before and after",
      "Working automations with error handling and retries",
      "Failure alerts routed to a channel someone reads",
      "Internal dashboard showing what ran and what didn't",
      "Training session so your team can edit flows themselves",
    ],
    capabilities: [
      {
        title: "Workflow orchestration",
        body: "n8n or Zapier for the connective tissue between SaaS tools; custom queue workers when the logic gets too specific for a no-code node.",
      },
      {
        title: "Data pipelines & ETL",
        body: "Scheduled jobs that pull from APIs and databases, clean and reconcile the data, and land it somewhere your reporting can trust.",
      },
      {
        title: "Document & OCR processing",
        body: "Invoices, receipts, forms and IDs turned into structured records, with a human review step for anything below a confidence threshold.",
      },
      {
        title: "Internal tools",
        body: "Small, sharp admin apps that replace a fragile spreadsheet — with permissions, an audit trail and validation at the point of entry.",
      },
      {
        title: "QA automation",
        body: "Cypress, Playwright or Selenium suites covering your critical paths, running in CI so regressions are caught before your users find them.",
      },
    ],
    stack: [
      "n8n",
      "zapier",
      "python",
      "node",
      "typescript",
      "postgres",
      "redis",
      "rabbitmq",
      "kafka",
      "docker",
      "cypress",
      "selenium",
      "opencv",
    ],
    timeline: "2–6 weeks per process",
    startingAt: "$3,500",
  },
  {
    slug: "ai-engineering",
    name: "AI Engineering",
    headline: "AI features that survive contact with real users",
    icon: BrainCircuit,
    intro:
      "The demo is easy. The hard part is grounding answers in your actual data, handling the 5% of queries that go sideways, and keeping token costs from quietly tripling. We build AI into products as a feature with guardrails, not a chatbot bolted to the corner of the screen.",
    problem:
      "Leadership wants an AI feature. The prototype hallucinates, there's no way to measure whether it's improving, and nobody's sure what it costs per user.",
    deliverables: [
      "Retrieval pipeline over your own documents and data",
      "Evaluation set so quality changes are measurable, not vibes",
      "Cost and latency budget per request, monitored in production",
      "Fallback behaviour for when the model is wrong or unavailable",
      "Clear boundaries on what the feature will and won't attempt",
    ],
    capabilities: [
      {
        title: "RAG over your data",
        body: "Chunking, embedding and vector search tuned to your document shapes, with citations back to the source so users can verify what they're told.",
      },
      {
        title: "Agentic workflows",
        body: "Multi-step tool-using flows for support triage, research and data entry — with approval gates on anything that writes, sends or spends.",
      },
      {
        title: "Model integration",
        body: "Provider-agnostic abstraction so switching models is a config change, plus caching and streaming so the interface feels instant.",
      },
      {
        title: "Computer vision",
        body: "Detection, classification and OCR for inspection, inventory and identity verification — running on-device when privacy or connectivity requires it.",
      },
    ],
    stack: [
      "openai",
      "langchain",
      "huggingface",
      "python",
      "pytorch",
      "tensorflow",
      "opencv",
      "postgres",
      "redis",
      "typescript",
      "nextjs",
    ],
    timeline: "4–12 weeks depending on data readiness",
    startingAt: "$9,000",
  },
  {
    slug: "product-design",
    name: "Product Design",
    headline: "Design that ships, because engineers helped draw it",
    icon: Compass,
    intro:
      "We design in the same room as the people building it, which kills the usual handover problem: no layouts that can't be built, no states the API can't provide. You get a system — tokens, components, real content — not forty disconnected screens.",
    problem:
      "Your product works but feels dated and confusing. Or you have a beautiful Figma file that developers keep quietly deviating from because it doesn't account for loading, empty and error states.",
    deliverables: [
      "Design system with tokens, type scale and spacing rhythm",
      "Component library matched 1:1 to the built code",
      "Every state designed: loading, empty, error, permission-denied",
      "Accessibility pass — contrast, focus order, screen reader labels",
      "Interactive prototype for stakeholder sign-off",
    ],
    capabilities: [
      {
        title: "Product & UX design",
        body: "User flows, information architecture and interface design grounded in what the data model can actually support.",
      },
      {
        title: "Design systems",
        body: "A token layer (colour, type, space, motion) feeding a component library, so a redesign is a variable change rather than a rewrite.",
      },
      {
        title: "Motion design",
        body: "Interaction and scroll choreography that communicates state and hierarchy — with a reduced-motion path built in from the start.",
      },
      {
        title: "Design QA",
        body: "We review the built product against the design at 375px, 768px, 1024px and 1440px, and file the differences. Nothing ships at 90%.",
      },
    ],
    stack: ["figma", "tailwind", "react", "nextjs", "gsap", "threejs", "typescript"],
    timeline: "3–8 weeks",
    startingAt: "$6,000",
  },
  {
    slug: "team-augmentation",
    name: "Team Augmentation",
    headline: "Senior engineers who arrive already useful",
    icon: Blocks,
    intro:
      "Sometimes you don't need an agency, you need two more good engineers by the end of the month. We embed into your repo, your standup and your review process — and we write the same tests and docs we'd write on our own projects.",
    problem:
      "Your roadmap is committed, hiring takes four months, and the contractors you tried last time needed more managing than they saved.",
    deliverables: [
      "Engineers in your standups, your board and your PR queue",
      "Code reviewed and merged under your standards, not ours",
      "Documentation written as work lands, not at the end",
      "Weekly written summary of shipped, blocked and at-risk",
      "Clean exit plan — no knowledge leaves with us",
    ],
    capabilities: [
      {
        title: "Embedded squads",
        body: "A designer plus two or three engineers who work as one unit inside your process, with a lead accountable for delivery.",
      },
      {
        title: "Specialist top-up",
        body: "One senior in a specific area — Flutter, .NET, Kubernetes, data — for a defined stretch of the roadmap.",
      },
      {
        title: "Legacy rescue",
        body: "Taking over an untested, undocumented codebase: characterisation tests first, then incremental refactor. No big-bang rewrites.",
      },
      {
        title: "Technical due diligence",
        body: "An honest written assessment of a codebase you're about to acquire, invest in, or inherit — architecture, risk, and what it'll cost to maintain.",
      },
    ],
    stack: ["react", "nextjs", "typescript", "node", "flutter", "dotnet", "laravel", "python", "docker", "git"],
    timeline: "Monthly retainer, 1 month minimum",
    startingAt: "$7,500/mo",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** How an engagement actually runs. Used on /about and the services page. */
export const process = [
  {
    step: "01",
    title: "Scoping call",
    duration: "Week 0 · free",
    body: "Forty-five minutes on what you're trying to achieve, what already exists, and what 'done' looks like. You leave with a rough shape and a range — not a pitch deck. If we're the wrong fit, we say so and point you somewhere better.",
  },
  {
    step: "02",
    title: "Discovery sprint",
    duration: "Week 1–2",
    body: "We map the flows, agree the data model, pick the stack for reasons we write down, and turn the wishlist into a prioritised scope. Output is a document you could hand to any competent team — including one that isn't us.",
  },
  {
    step: "03",
    title: "Design & architecture",
    duration: "Week 2–4",
    body: "Interface design and system architecture happen together. You approve real screens with real content, including the empty and error states, before anyone writes production code.",
  },
  {
    step: "04",
    title: "Build in two-week cycles",
    duration: "Week 4 onward",
    body: "Every fortnight you get a deployed staging build, a demo, and an honest list of what slipped. No status theatre, no invoice surprises, no six-week silences.",
  },
  {
    step: "05",
    title: "Hardening & launch",
    duration: "Final 2 weeks",
    body: "Load testing, accessibility audit, security review, monitoring and alerting. Then a staged rollout with someone from our team watching the dashboards on launch day.",
  },
  {
    step: "06",
    title: "Handover or keep going",
    duration: "Ongoing",
    body: "Repo access, architecture notes, runbooks and a walkthrough with your team. Then either we step back cleanly, or we stay on a support retainer. Your call, never locked in.",
  },
] as const;

/** Principles for the /about page. These double as our filter on what work we take. */
export const principles = [
  {
    title: "We'll talk you out of things",
    body: "If a feature won't earn its maintenance cost, we say so before quoting it. Scope we remove early is the cheapest thing we can give you.",
  },
  {
    title: "The stack has to be defensible",
    body: "Every technology choice comes with a written reason and the trade-off we accepted. Nothing gets picked because it was trending this quarter.",
  },
  {
    title: "You own everything",
    body: "Your repo, your cloud account, your accounts and keys from day one. No proprietary layer that makes leaving expensive.",
  },
  {
    title: "Honest status, always",
    body: "If we're late, you hear it in the demo it affects — not in the retrospective. Bad news early is worth more than good news on time.",
  },
] as const;
