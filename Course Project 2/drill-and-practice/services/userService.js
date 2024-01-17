import {sql} from "../database/database.js";


const addUser = async (email, password) => { 
    await sql`insert into users (email,password) values (${email},${password})`;
};


const findUserByEmail = async (email) => { 
    const rows= await sql`select * from users where email=${email}`;
    if (rows&&rows.length>0){
        return rows[0];
    }else{
        return -1;
    }
};


export {addUser, findUserByEmail};