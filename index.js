const express = require("express");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/product");
const penjualanRoutes = require("./routes/penjualan");
const laporanpenjualanRoutes = require("./routes/laporanpenjualan");

const app = express();
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const port = "3306";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

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
