import mysql from "mysql2"

const db = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "94050321@Mysql",
  database: "atomicstore",
});

export default db