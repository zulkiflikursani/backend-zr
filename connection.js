var mysql = require("mysql");
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const user = "uvwvc1uf3p3geszx";
const password = "hVwRnAIbQDi0hsIoj7Wy";
const database = "bv4yes5gbuhpqn8gsc3z";
const port = "3306";

var con = mysql.createConnection({
  host: hostname,
  user: user,
  password: password,
  database: database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
