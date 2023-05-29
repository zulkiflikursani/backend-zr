const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const penjualanRoutes = require("./routes/penjualan");
const laporanpenjualanRoutes = require("./routes/laporanpenjualan");

const app = express();
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const port = "3306";

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requseted-With,Content-Type,Accept,Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }
});
app.use((req, req, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
app.use("/products", productRoutes);
app.use("/penjualan", penjualanRoutes);
app.use("/penjualan", laporanpenjualanRoutes);

app.get("/", (req, res) => {
  res.send("ok");
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
