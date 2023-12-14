import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as messagesService from "./services/messagesService.js";

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



const addInfor= async(request) =>{
  const formData= await request.formData();
  const sender=formData.get('sender');
  const message=formData.get('message');
  await messagesService.create(sender,message);
  return redirectTo('/');
}


const listInfor= async(request) =>{
  const data={
    infors:await messagesService.findAll(),
  };
  return new Response(await renderFile("index.eta", data), responseDetails);
};

const handleRequest = async (request) => {
  if (request.method==="POST"){
    return await addInfor(request);
  }else if (request.method==="GET"){
    return await listInfor(request);
  }
};

serve(handleRequest, { port: 7777 });
