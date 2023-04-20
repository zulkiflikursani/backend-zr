var mysql = require("mysql");
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const user = "uvwvc1uf3p3geszx";
const password = "hVwRnAIbQDi0hsIoj7Wy";
const database = "bv4yes5gbuhpqn8gsc3z";
const port = "3306";

var con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

con.getConnection(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
