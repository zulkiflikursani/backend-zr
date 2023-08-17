const express = require("express");
const router = express.Router();
const con = require("../connection");

router.get("/", (req, res) => {
  try {
    con.query(
      "select id,nama_barang,hbeli,createAt as tanggal,kode_barang,kode_pembelian,qty from pembelian",
      function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// getproduct

router.get("/:kode_pembelian", (req, res) => {
  const kode_pembelian = req.params.kode_pembelian;
  const sql = `SELECT * FROM pembelian WHERE kode_pembelian='${kode_pembelian}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

const makeid = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

router.post("/", (req, res) => {
  let kode_pembelian = makeid(5);

  const { data } = req.body;
  var temp = "";
  data.map((data) => {
    temp += `('${data.nama}',${data.hbeli},'${data.id}','${kode_pembelian}',${data.qty},now()),`;
  });
  const sql =
    `INSERT INTO pembelian (nama_barang,beli,kode_barang,kode_penjualan,qty,createAt) VALUES` +
    temp.substring(0, temp.length - 1);
  // res.status(200).json(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

router.delete("/:kode_pembelian", (req, res) => {
  const kode_pembelian = req.params.kode_pembelian;
  const sql = `DELETE FROM pembelian WHERE kode_pembelian='${kode_pembelian}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

module.exports = router;
