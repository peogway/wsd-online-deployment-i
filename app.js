import { serve } from "./deps.js";

const handleRequest = (request) => {
  return new Response("xin chasdfo");
};

serve(handleRequest, { port: 7777 });
