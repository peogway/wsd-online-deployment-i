import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as messageService from "./services/messageService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const listMessages = async () => {
  const data = {
    messages: await messageService.findLastFiveMessages(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const addMessage = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender");
  const message = formData.get("message");

  await messageService.create(sender, message);
};

const handleRequest = async (request) => {
  if (request.method === "GET") {
    return await listMessages();
  } else if (request.method === "POST") {
    await addMessage(request);
    return redirectTo("/");
  }
};

serve(handleRequest, { port: 7777 });