const express = require("express");
const router = express.Router();
const con = require("../connection");

router.get("/", (req, res) => {
  try {
    con.query("select * from penjualan", function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// getproduct

router.get("/", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM penjualan`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

router.get("/:kode_penjualan", (req, res) => {
  const kode_penjualan = req.params.kode_penjualan;
  const sql = `SELECT * FROM PENJUALAN WHERE KODE_PENJUALAN='${kode_penjualan}'`;
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
  let kode_penjualan = makeid(5);

  const { data } = req.body;
  var temp = "";
  data.map((data) => {
    temp += `('','${data.nama}',${data.hjual},'${data.id}','${kode_penjualan}',${data.qty},now()),`;
  });
  const sql =
    `INSERT INTO penjualan (id,nama_barang,hjual,kode_barang,kode_penjualan,qty,createAt) VALUES` +
    temp.substring(0, temp.length - 1);
  // res.send(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(201).send(result);
  });
});

router.delete("/:kode_penjualan", (req, res) => {
  const kode_penjualan = req.params.kode_penjualan;
  const sql = `DELETE FROM PENJUALAN WHERE KODE_PENJUALAN='${kode_penjualan}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

module.exports = router;
