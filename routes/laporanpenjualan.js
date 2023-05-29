const express = require("express");
const router = express.Router();
const con = require("../connection");

router.get("/", (req, res) => {
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

module.exports = router;
