import { sql } from "../database/database.js";

const lastUploadedId = async () => {
  const rows = await sql`SELECT MAX(id) as max_id FROM miniupload_files`;
  if (rows && rows.length == 1) {
    return rows[0].max_id;
  } else {
    return -1;
  }
};

const add_new_file = async (name, type, password, data) => { 
  await sql`insert into miniupload_files (name, type, password, data) values (${name},${type}, ${password}, ${data})`;
}

const find_file = async (id) => { 
  const rows= await sql`select * from miniupload_files where id= ${id}`;
  if (rows&& rows.length>0) { 
    return rows[0];
  }else { 
    return false;
  }
}

export { lastUploadedId, add_new_file , find_file};
