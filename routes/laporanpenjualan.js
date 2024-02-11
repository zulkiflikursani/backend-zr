import express from "express";
const router = express.Router();
import con from "../config/connection.js";

router.get("/", (req, res) => {
  const mulai = req.query.mulai;
  const sampai = req.query.sampai;
  const sql = `select penjualan.nama_barang,
          penjualan.hjual,
          penjualan.createAt as tanggal,
          penjualan.kode_barang,
          penjualan.kode_penjualan,
          penjualan.qty,
          product.hbeli,
          penjualan.id from penjualan LEFT JOIN product on penjualan.kode_barang = product.id where  CAST(penjualan.createAt as date) BETWEEN '${mulai}' and '${sampai}'`;
  // res.send(sql);
  con.query(sql).then((result) => {
    res.status(200).json(result);
  });
});

export default router;
