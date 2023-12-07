//* Libraries imports
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

//* Create a new Elysia app
const app = new Elysia();

//* Use cors middleware
app.use(cors({
  origin: "*",
}));

//* Create a new route
app.get("/", () => "Hello Elysia").listen(3000);

//* Start the app
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
