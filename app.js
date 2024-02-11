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
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: "error:" + error.message,
  });
});
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requseted-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });
const corsoption = {
  origin: ["https://frontend-zr.vercel.app", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsoption));
app.use(cookieParser());
app.use(express.json());
app.use("/token", token);
app.use("/users", users);
app.use("/products", product);
app.use("/pembelian", pembelian);
app.use("/penjualan", penjualan);
app.use("/laporanpenjualan", laporanPenjualan);

export default app;
