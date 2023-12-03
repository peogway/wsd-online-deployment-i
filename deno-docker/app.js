import { serve } from "https://deno.land/std@0.202.0/http/server.ts";

const handleRequest = (request) => {
  return new Response("Mehsadfasdh42");
};

serve(handleRequest, { port: 7777 });