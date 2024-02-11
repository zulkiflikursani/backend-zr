const express = require("express");
const apps = require("/app");
const con = require("./config/connection.js");
// import Users from "./models/users.js";

// const http = require("http");

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";
// const app = require("./app");
const app = express();
// const server = http.createServer(app);
try {
  await con.authenticate();
  console.log("Database Connect");
  // await Users.sync();
} catch (error) {
  console.log(error);
}
apps.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// console(server);

//s
