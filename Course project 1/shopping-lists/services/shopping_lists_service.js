import { sql } from "../database/database.js";

const find_active_shopping_lists = async () => {
    return await sql`select * from shopping_lists where active = true`;
};

const create_shopping_lists = async (name) => {
    await sql`insert into shopping_lists (name) values (${name})`;
};

const deactivate_shopping_list = async (id) => {
    await sql`update shopping_lists set active=false where id = ${id}`;
};

const find_shopping_list_name_by_id = async (id) => {
    const rows=await sql`select * from shopping_lists where id = ${id}`;
    return rows[0].name;
};

export {find_active_shopping_lists, create_shopping_lists, deactivate_shopping_list, find_shopping_list_name_by_id};