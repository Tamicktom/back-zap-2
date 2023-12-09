//* Libraries imports
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import z from "zod";
import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

//* Create a new Elysia app
const app = new Elysia({
  websocket: {
    idleTimeout: 960,
  },
});

//* Use cors middleware
app.use(
  cors({
    origin: "*",
  })
);

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

//* Create a new route
app.get("/", () => "Hello Elysia");

app.ws("/ws", {
  message: async (ws, message) => {
    const parsedMessage = schema.safeParse(message);
    if (!parsedMessage.success) return ws.send(parsedMessage.error.message);
    console.log("Message received", ws.data.headers);

    const messages = await p.message.findMany();

    ws.send({
      messages,
      message
    });
  },
});

app.listen(3000);

//* Start the app
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
