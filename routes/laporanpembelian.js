const express = require("express");
const router = express.Router();
const con = require("../connection");
const { route } = require("./Pembelian");

router.get("/", (req, res) => {
  const mulai = req.query.mulai;
  const sampai = req.query.sampai;
  const sql =
    "select pembelian.nama_barang,pembelian.hbeli,createAt as tangaal,pembelian.kode_barang,pembelian.kode_pembelian,pembelian.qty,pembelian.id from pembelian where CAST(pembelian.createAt as date) BETWEEN '${mulai}' and '${sampai}'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

module.exports = router;
