import { sql } from "../database/database.js";
const findAll= async() =>{
  return await sql`SELECT * FROM messages order by id desc LIMIT 5;`;
};
const create= async(sender,message) =>{
  return await sql`insert into messages(sender,message) values(${sender},${message})`;
}

export {create, findAll }
