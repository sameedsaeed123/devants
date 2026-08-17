import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";
import ws from "ws";

// Required for Neon's WebSocket-based connection in Node.js / serverless runtimes.
neonConfig.webSocketConstructor = ws;

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  // PrismaNeon takes a PoolConfig (plain object), not a Pool instance.
  const adapter = new PrismaNeon({ connectionString: url });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Reuse the client across hot reloads in dev so we don't leak connections.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
