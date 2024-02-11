import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import users from "./routes/users.js";
import product from "./routes/product.js";
import pembelian from "./routes/pembelian.js";
import penjualan from "./routes/penjualan.js";
import laporanPenjualan from "./routes/laporanpenjualan.js";
import cookieParser from "cookie-parser";
import token from "./routes/token.js";
import cors from "cors";
const app = express.Router();

app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: "error:" + error.message,
  });
});
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/token", token);
app.use("/users", users);
app.use("/products", product);
app.use("/pembelian", pembelian);
app.use("/penjualan", penjualan);
app.use("/laporanpenjualan", laporanPenjualan);

export default app;
