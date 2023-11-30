import { serve } from "./deps.js";

const handleRequest = (request) => {
  return new Response("He tam bietlldfo you!");
};

serve(handleRequest, { port: 7777 });
