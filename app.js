import { serve } from "https://deno.land/std@0.202.0/http/server.ts";

let count = 5;

const handleRequest = (request) => {
  count++;
  const content = `<html><head></head><body><h1>${count}</h1></body></html>`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
};

serve(handleRequest, { port: 7777 });