const http = require("http");

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || "localhost";
const app = require("./app");

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// console(server);

//s
