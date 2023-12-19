import * as shopping_lists_service from "../services/shopping_lists_service.js"
import { redirectTo } from "../utils/requestUtils.js";
import { renderFile } from "../dep.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const main_page = async (request,count_shopping_lists,count_shopping_list_items) =>{
    const data = {
        count_shoppingLists: count_shopping_lists,
        count_shoppingList_items: count_shopping_list_items,
    };
    return new Response(await renderFile("index.eta", data), responseDetails);
  };

const show_lists = async (request) => {
    const data={
        lists: await shopping_lists_service.find_active_shopping_lists(),
    };
    return new Response(await renderFile("shopping_lists.eta",data),responseDetails);
  };

const create_shopping_lists = async (request) => {
    const formData= await request.formData();
    const name = formData.get("name");
    await shopping_lists_service.create_shopping_lists(name);
    return redirectTo("/lists");
  };

const deactivate_shopping_list = async (request) => {
    const url=new URL(request.url);
    const path=url.pathname;
    const urlParts=path.split("/");
    const id= urlParts[2];
    await shopping_lists_service.deactivate_shopping_list(id);
    return redirectTo("/lists");
  };


export {main_page, show_lists, create_shopping_lists, deactivate_shopping_list};

