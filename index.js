const express = require("express");
const bodyParser = require("body-parser");
const con = require("./connection");
const response = require("./response");
const cors = require("cors");

const app = express();
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const port = "3306";

// app.use(
//   cors({
//     origin: "http://localhost:5000",
//   })
// );
app.use(bodyParser.json());
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/penjualan", (req, res) => {
  try {
    con.query("select * from penjualan", function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// getprocuct
app.get("/procucts", (req, res) => {
  try {
    con.query("select * from procuct", function (err, result) {
      if (err) throw err;
      //   response(200, result, "data produk", res);
      res.status(200).json(result);
    });
  } catch (error) {
    // response(500, ");
    res.status(500).json({ msg: error.message });
  }
});

// get prduk by id
app.get("/procucts/:id", (req, res) => {
  const id = req.params.id;
  try {
    con.query(`select * from procuct where id=${id}`, function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// simpan poduk
app.post("/procucts", (req, res) => {
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `INSERT INTO procuct VALUES('','${nama}','${kat}',${hbeli},${hjual},now())`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
// update produk
app.patch("/procucts/:id", (req, res) => {
  const id = req.params.id;
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `UPDATE procuct SET NAMA='${nama}',KAT='${kat}',HJUAL=${hjual},HBELI=${hbeli},CREATEAT=NOW() WHERE ID=${id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
// delete produk
app.delete("/procucts/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM procuct WHERE ID='${id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.get("/penjualan", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM penjualan`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.get("/penjualan/:kode_penjualan", (req, res) => {
  const kode_penjualan = req.params.kode_penjualan;
  const sql = `SELECT * FROM penjualan WHERE KODE_penjualan='${kode_penjualan}'`;
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

app.post("/penjualan", (req, res) => {
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

app.delete("/penjualan/:kode_penjualan", (req, res) => {
  const kode_penjualan = req.params.kode_penjualan;
  const sql = `DELETE FROM penjualan WHERE KODE_penjualan='${kode_penjualan}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
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
  procuct.hbeli,
  penjualan.id from penjualan LEFT JOIN procuct on penjualan.kode_barang=procuct.id where  CAST(penjualan.createAt as date) BETWEEN '${mulai}' and '${sampai}'`;
  // res.send(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
