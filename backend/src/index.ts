import "dotenv/config";

import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import { registerRoutes } from "./routes/index.js";


const fastify = Fastify({ logger: true });

// Root check
fastify.get("/", async () => {
  return { message: "Backend is running 🚀" };
});

// CORS
await fastify.register(cors, {
  origin: true,
});

// Multipart
await fastify.register(multipart);

// Register all routes
await registerRoutes(fastify);

// Debug routes (VERY IMPORTANT)
console.log(fastify.printRoutes());

// Start server
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});