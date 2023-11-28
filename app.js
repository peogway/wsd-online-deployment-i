import { serve } from "./deps.js";

const handleRequest = (request) => {
  return new Response("Hello ban!");
};

serve(handleRequest, { port: 7777 });
