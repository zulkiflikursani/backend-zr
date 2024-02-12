import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import users from "./routes/users.js";
// import users2 from "/routes/users.js";
import product from "./routes/product.js";
// import pembelian from "./routes/pembelian.js";
import penjualan from "./routes/penjualan.js";
import laporanPenjualan from "./routes/laporanpenjualan.js";
import cookieParser from "cookie-parser";
import token from "./routes/token.js";
const app = express.Router();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use(cookieParser());
app.use(express.json());
app.use("/token", token);
app.use("/users", users);
app.use("/products", product);
// app.use("/pembelian", pembelian);
app.use("/penjualan", penjualan);
app.use("/laporanpenjualan", laporanPenjualan);

export default app;
