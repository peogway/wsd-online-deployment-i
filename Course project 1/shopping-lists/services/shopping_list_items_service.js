import { sql } from "../database/database.js";


const find_shopping_list_items = async (id) => { 
    const rows=await sql`select * from shopping_list_items 
                            where shopping_list_id=${id}
                                order by collected asc, name asc`;
    return rows;
};

const create_shopping_list_item = async (id,name) => {
    await sql`insert into shopping_list_items (shopping_list_id,name) values (${id},${name})`;
};

const collect_shopping_list_item = async (id_shopping_list, id_item) => {
    await sql`update shopping_list_items set collected = true 
        where shopping_list_id=${id_shopping_list} and id=${id_item}`;
};

export {find_shopping_list_items, create_shopping_list_item, collect_shopping_list_item};