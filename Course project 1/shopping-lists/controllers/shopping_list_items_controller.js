import * as shopping_list_items_service from "../services/shopping_list_items_service.js";
import * as shopping_lists_service from "../services/shopping_lists_service.js";
import { redirectTo } from "../utils/requestUtils.js";
import { renderFile } from "../dep.js";


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };


const show_shopping_list_items = async (request) => {
  const url= new URL(request.url);
  const path = url.pathname;
  const urlParts=path.split("/");
  const id= urlParts[2];
  const data = { 
      id_list: id,
      name_shopping_list: await shopping_lists_service.find_shopping_list_name_by_id(id),
      list_items: await shopping_list_items_service.find_shopping_list_items(id),

  };
  return new Response(await renderFile("shopping_list_items.eta",data), responseDetails);
};

const create_shopping_list_item = async (request) => {
  const url= new URL(request.url);
  const path = url.pathname;
  const urlParts=path.split("/");
  const id= urlParts[2];
  const formData= await request.formData();
  const name= formData.get("name");
  await shopping_list_items_service.create_shopping_list_item(id,name);
  return redirectTo(`/lists/${id}`);
};

const collect_shopping_list_item = async (request) => {
  const url=new URL(request.url);
  const path= url.pathname;
  const urlParts=path.split("/");
  const id_shopping_list= urlParts[2];
  const id_item=urlParts[4];
  await shopping_list_items_service.collect_shopping_list_item(id_shopping_list,id_item);
  return redirectTo(`/lists/${id_shopping_list}`);
};

export {show_shopping_list_items, create_shopping_list_item, collect_shopping_list_item};