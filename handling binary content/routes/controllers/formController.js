import * as fileService from "../../services/fileService.js";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

const viewForm = async ({ render }) => {
  const lastId = await fileService.lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const postFile = async ({response, request}) => { 
  const body= request.body({ type : "form-data"});
  const reader= await body.value;
  const data= await reader.read();
  const file=data.files[0];
  const fileContents= await Deno.readAll(
    await Deno.open(file.filename)
  );
  const base64Encoded= base64.fromUint8Array(fileContents);
  const name= file.originalName;
  const type=file.contentType;
  const pw = `${Math.floor(100000 * Math.random())}`;
  const hash= await bcrypt.hash(pw);
  await fileService.add_new_file(name,type, hash, base64Encoded);
  response.body= pw;
};

const showFile = async ({ response, request}) => {
  const body= request.body({ type: "form" });
  const content= await body.value;
  const id= content.get("id");
  const password= content.get("password");
  const file= await fileService.find_file(id);
  const result= await bcrypt.compare(password, file.password);
  if (!result||!file) { 
    response.status= 401;
    return;
  }
  response.headers.set("Content-Type", file.type);
  const arr= base64.toUint8Array(file.data);
  response.headers.set("Content-Length",arr.length);
  response.body=arr;

};

export { viewForm, postFile, showFile};
