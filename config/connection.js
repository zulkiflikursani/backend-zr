// var mysql = require("mysql");
import { Sequelize } from "sequelize";
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const user = "uvwvc1uf3p3geszx";
const password = "hVwRnAIbQDi0hsIoj7Wy";
const database = "bv4yes5gbuhpqn8gsc3z";
const port = "3306";

// const hostname = "localhost";
// const user = "root";
// const password = "Zulriana89";
// const database = "zr-cell-react";
// const port = 5000;

// var con = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DBNAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// var con = mysql.createPool({
//   host: hostname,
//   user: user,
//   password: password,
//   database: database,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// con.getConnection(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

const con = new Sequelize(database, user, password, {
  host: hostname,
  dialect: "mysql",
});
// module.exports  = con;
export default con;
