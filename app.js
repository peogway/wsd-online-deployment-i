import { serve } from "./deps.js";

const handleRequest = (request) => {
  return new Response("xin chao");
};

serve(handleRequest, { port: 7777 });
