import {serve} from "./dep.js";
import {configure} from "./dep.js";
import * as shopping_lists_controller from "./controllers/shopping_lists_controller.js";
import * as shopping_list_items_controller from "./controllers/shopping_list_items_controller.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest= async (request) =>{
    const url=new URL(request.url);
    const path=url.pathname;
    const method=request.method;
    //return new Response(`${Deno.cwd()}: beoo`);
    if (method==="GET"&&path==="/"){
        return await shopping_lists_controller.main_page(request);
    }else if (method==="GET"&&path==="/lists"){
        return await shopping_lists_controller.show_lists(request);
    }else if (method==="POST"&&path==="/lists"){
        return await shopping_lists_controller.create_shopping_lists(request);
    }else if (method==="POST"&&path.match("/lists/[0-9]+/deactivate")){
        return await shopping_lists_controller.deactivate_shopping_list(request);
    }else if (method==="GET"&&path.match("/lists/[0-9]+")){
        return await shopping_list_items_controller.show_shopping_list_items(request);
    }else if (method==="POST"&&path.match("/lists/[0-9]+/items/[0-9]+/collect")){
        return await shopping_list_items_controller.collect_shopping_list_item(request);
    }else if (method==="POST"&&path.match("/lists/[0-9]+")){
        return await shopping_list_items_controller.create_shopping_list_item(request);
    }else{
        return new Response("Not found", {status:404});
    }

};


serve(handleRequest, { port: 7777 });