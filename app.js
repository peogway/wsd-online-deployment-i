import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

let visitCount = 0;

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    visitCount++;

    const data = {
      count: visitCount,
      title: "Counter!",
    };

    return new Response(await renderFile("index.eta", data), responseDetails);
  } else {
    return new Response("Not fodfundsffd", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });