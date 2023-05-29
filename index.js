const express = require("express");
const bodyParser = require("body-parser");
const con = require("./connection");
const cors = require("cors");

const productRoutes = require("./routes/product");
const penjualanRoutes = require("./routes/penjualan");

const app = express();
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const port = "3306";

// const hostname = "localhost";
// const port = "5000";
var corsOptions = {
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
app.use("/products", productRoutes);
app.use("/penjualan", penjualanRoutes);

app.get("/", (req, res) => {
  res.send("ok");
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/laporanpenjualan", (req, res) => {
  const mulai = req.query.mulai;
  const sampai = req.query.sampai;
  const sql = `select penjualan.nama_barang,
  penjualan.hjual,
  FORMAT (penjualan.createAt, 'dd-MM-yy') as 'dd-mm-yyyy',
  penjualan.kode_barang,
  penjualan.kode_penjualan,
  penjualan.qty,
  product.hbeli,
  penjualan.id from penjualan LEFT JOIN product on penjualan.kode_barang=product.id where  CAST(penjualan.createAt as date) BETWEEN '${mulai}' and '${sampai}'`;
  // res.send(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
