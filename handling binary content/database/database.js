import postgres from "https://deno.land/x/postgresjs@v3.4.2/mod.js";

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
