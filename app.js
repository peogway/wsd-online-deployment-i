import { serve } from "./deps.js";

const handleRequest = (request) => {
  return new Response("He tam bietlldfo ybeooou!");
};

serve(handleRequest, { port: 7777 });
