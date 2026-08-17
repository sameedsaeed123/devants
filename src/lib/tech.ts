import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
// Simple Icons dropped the OpenAI mark (trademark policy) — Remix Icon still carries it.
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiAngular,
  SiAnsible,
  SiApachekafka,
  SiAndroid,
  SiApple,
  SiCloudflare,
  SiCypress,
  SiDart,
  SiDigitalocean,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiElasticsearch,
  SiElectron,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGithubactions,
  SiGooglecloud,
  SiGrafana,
  SiGraphql,
  SiGreensock,
  SiHuggingface,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiKotlin,
  SiKubernetes,
  SiLangchain,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,

  SiOpencv,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPrometheus,
  SiPython,
  SiPytorch,
  SiRabbitmq,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiRedux,
  SiSelenium,
  SiSentry,
  SiSharp,
  SiShopify,
  SiSocketdotio,
  SiStripe,
  SiSupabase,
  SiSvelte,
  SiSwift,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiWordpress,
  SiZapier,
} from "react-icons/si";

export type TechCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "devops"
  | "ai"
  | "tooling";

export type Tech = {
  slug: string;
  name: string;
  icon: IconType;
  /** Official brand hex — used at low opacity for hover glows, never for body text. */
  color: string;
  category: TechCategory;
};

/**
 * Single source of truth for every technology badge on the site.
 * Project.stack in the DB stores comma-separated slugs from this registry.
 */
export const TECH: Record<string, Tech> = {
  // ---------- Frontend ----------
  react: { slug: "react", name: "React", icon: SiReact, color: "#61DAFB", category: "frontend" },
  nextjs: { slug: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", category: "frontend" },
  typescript: { slug: "typescript", name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend" },
  javascript: { slug: "javascript", name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend" },
  vue: { slug: "vue", name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D", category: "frontend" },
  angular: { slug: "angular", name: "Angular", icon: SiAngular, color: "#DD0031", category: "frontend" },
  svelte: { slug: "svelte", name: "Svelte", icon: SiSvelte, color: "#FF3E00", category: "frontend" },
  tailwind: { slug: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend" },
  redux: { slug: "redux", name: "Redux", icon: SiRedux, color: "#764ABC", category: "frontend" },
  threejs: { slug: "threejs", name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", category: "frontend" },
  gsap: { slug: "gsap", name: "GSAP", icon: SiGreensock, color: "#0AE448", category: "frontend" },
  electron: { slug: "electron", name: "Electron", icon: SiElectron, color: "#47848F", category: "frontend" },

  // ---------- Backend ----------
  node: { slug: "node", name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", category: "backend" },
  express: { slug: "express", name: "Express", icon: SiExpress, color: "#FFFFFF", category: "backend" },
  laravel: { slug: "laravel", name: "Laravel", icon: SiLaravel, color: "#FF2D20", category: "backend" },
  php: { slug: "php", name: "PHP", icon: SiPhp, color: "#777BB4", category: "backend" },
  dotnet: { slug: "dotnet", name: ".NET", icon: SiDotnet, color: "#512BD4", category: "backend" },
  csharp: { slug: "csharp", name: "C#", icon: SiSharp, color: "#9179C0", category: "backend" },
  django: { slug: "django", name: "Django", icon: SiDjango, color: "#0C4B33", category: "backend" },
  flask: { slug: "flask", name: "Flask", icon: SiFlask, color: "#FFFFFF", category: "backend" },
  python: { slug: "python", name: "Python", icon: SiPython, color: "#3776AB", category: "backend" },
  graphql: { slug: "graphql", name: "GraphQL", icon: SiGraphql, color: "#E10098", category: "backend" },
  socketio: { slug: "socketio", name: "Socket.IO", icon: SiSocketdotio, color: "#FFFFFF", category: "backend" },
  kafka: { slug: "kafka", name: "Apache Kafka", icon: SiApachekafka, color: "#FFFFFF", category: "backend" },
  rabbitmq: { slug: "rabbitmq", name: "RabbitMQ", icon: SiRabbitmq, color: "#FF6600", category: "backend" },

  // ---------- Mobile ----------
  flutter: { slug: "flutter", name: "Flutter", icon: SiFlutter, color: "#02569B", category: "mobile" },
  dart: { slug: "dart", name: "Dart", icon: SiDart, color: "#0175C2", category: "mobile" },
  reactnative: { slug: "reactnative", name: "React Native", icon: SiReact, color: "#61DAFB", category: "mobile" },
  expo: { slug: "expo", name: "Expo", icon: SiExpo, color: "#FFFFFF", category: "mobile" },
  swift: { slug: "swift", name: "Swift", icon: SiSwift, color: "#F05138", category: "mobile" },
  kotlin: { slug: "kotlin", name: "Kotlin", icon: SiKotlin, color: "#7F52FF", category: "mobile" },
  android: { slug: "android", name: "Android", icon: SiAndroid, color: "#3DDC84", category: "mobile" },
  ios: { slug: "ios", name: "iOS", icon: SiApple, color: "#FFFFFF", category: "mobile" },

  // ---------- Database ----------
  mongodb: { slug: "mongodb", name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "database" },
  postgres: { slug: "postgres", name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "database" },
  mysql: { slug: "mysql", name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database" },
  redis: { slug: "redis", name: "Redis", icon: SiRedis, color: "#FF4438", category: "database" },
  prisma: { slug: "prisma", name: "Prisma", icon: SiPrisma, color: "#FFFFFF", category: "database" },
  firebase: { slug: "firebase", name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "database" },
  supabase: { slug: "supabase", name: "Supabase", icon: SiSupabase, color: "#3FCF8E", category: "database" },
  elasticsearch: { slug: "elasticsearch", name: "Elasticsearch", icon: SiElasticsearch, color: "#005571", category: "database" },

  // ---------- DevOps & automation ----------
  docker: { slug: "docker", name: "Docker", icon: SiDocker, color: "#2496ED", category: "devops" },
  kubernetes: { slug: "kubernetes", name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", category: "devops" },
  aws: { slug: "aws", name: "AWS", icon: FaAws, color: "#FF9900", category: "devops" },
  gcp: { slug: "gcp", name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4", category: "devops" },
  cloudflare: { slug: "cloudflare", name: "Cloudflare", icon: SiCloudflare, color: "#F38020", category: "devops" },
  digitalocean: { slug: "digitalocean", name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF", category: "devops" },
  vercel: { slug: "vercel", name: "Vercel", icon: SiVercel, color: "#FFFFFF", category: "devops" },
  terraform: { slug: "terraform", name: "Terraform", icon: SiTerraform, color: "#844FBA", category: "devops" },
  ansible: { slug: "ansible", name: "Ansible", icon: SiAnsible, color: "#EE0000", category: "devops" },
  githubactions: { slug: "githubactions", name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF", category: "devops" },
  jenkins: { slug: "jenkins", name: "Jenkins", icon: SiJenkins, color: "#D33833", category: "devops" },
  nginx: { slug: "nginx", name: "NGINX", icon: SiNginx, color: "#009639", category: "devops" },
  linux: { slug: "linux", name: "Linux", icon: SiLinux, color: "#FCC624", category: "devops" },
  grafana: { slug: "grafana", name: "Grafana", icon: SiGrafana, color: "#F46800", category: "devops" },
  prometheus: { slug: "prometheus", name: "Prometheus", icon: SiPrometheus, color: "#E6522C", category: "devops" },
  sentry: { slug: "sentry", name: "Sentry", icon: SiSentry, color: "#362D59", category: "devops" },
  n8n: { slug: "n8n", name: "n8n", icon: SiN8N, color: "#EA4B71", category: "devops" },
  zapier: { slug: "zapier", name: "Zapier", icon: SiZapier, color: "#FF4F00", category: "devops" },

  // ---------- AI ----------
  openai: { slug: "openai", name: "OpenAI", icon: RiOpenaiFill, color: "#FFFFFF", category: "ai" },
  langchain: { slug: "langchain", name: "LangChain", icon: SiLangchain, color: "#FFFFFF", category: "ai" },
  huggingface: { slug: "huggingface", name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E", category: "ai" },
  tensorflow: { slug: "tensorflow", name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", category: "ai" },
  pytorch: { slug: "pytorch", name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", category: "ai" },
  opencv: { slug: "opencv", name: "OpenCV", icon: SiOpencv, color: "#5C3EE8", category: "ai" },

  // ---------- Tooling & integrations ----------
  git: { slug: "git", name: "Git", icon: SiGit, color: "#F05032", category: "tooling" },
  figma: { slug: "figma", name: "Figma", icon: SiFigma, color: "#F24E1E", category: "tooling" },
  jest: { slug: "jest", name: "Jest", icon: SiJest, color: "#C21325", category: "tooling" },
  cypress: { slug: "cypress", name: "Cypress", icon: SiCypress, color: "#69D3A7", category: "tooling" },
  selenium: { slug: "selenium", name: "Selenium", icon: SiSelenium, color: "#43B02A", category: "tooling" },
  stripe: { slug: "stripe", name: "Stripe", icon: SiStripe, color: "#635BFF", category: "tooling" },
  razorpay: { slug: "razorpay", name: "Razorpay", icon: SiRazorpay, color: "#0C2451", category: "tooling" },
  shopify: { slug: "shopify", name: "Shopify", icon: SiShopify, color: "#7AB55C", category: "tooling" },
  wordpress: { slug: "wordpress", name: "WordPress", icon: SiWordpress, color: "#21759B", category: "tooling" },
};

export function getTech(slug: string): Tech | undefined {
  return TECH[slug.trim().toLowerCase()];
}

export function techList(slugs: string[]): Tech[] {
  return slugs.map(getTech).filter((t): t is Tech => Boolean(t));
}

export function techByCategory(category: TechCategory): Tech[] {
  return Object.values(TECH).filter((t) => t.category === category);
}

/** Marquee row for the homepage — the logos we want front and centre. */
export const MARQUEE_TECH: string[] = [
  "react",
  "nextjs",
  "typescript",
  "node",
  "flutter",
  "reactnative",
  "laravel",
  "dotnet",
  "django",
  "flask",
  "mongodb",
  "postgres",
  "docker",
  "kubernetes",
  "aws",
  "terraform",
  "githubactions",
  "graphql",
  "redis",
  "tailwind",
  "python",
  "swift",
  "kotlin",
  "openai",
];
