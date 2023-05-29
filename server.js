const http = require("http");
const hostname =
  process.env.HOSTNAME ||
  "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const port = process.env.PORT || 3000;
const app = require("./app");

const server = http.createServer(app);

server.listen(port);
