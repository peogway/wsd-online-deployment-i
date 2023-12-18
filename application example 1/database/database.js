import { postgres } from "../dep.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: "flora.db.elephantsql.com",
    database: "legjwppq",
    username: "legjwppq",
    password: "N7MZclEmfb7boNtT3THiMzJFNGZl1AF7",
    port: 5432,
  });
}

export { sql };