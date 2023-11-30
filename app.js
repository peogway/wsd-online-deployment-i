import { serve } from "./deps.js";

const handleRequest = (request) => {
  return new Response("Helldfo you!");
};

serve(handleRequest, { port: 7777 });
