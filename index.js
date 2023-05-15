const express = require("express");
const bodyParser = require("body-parser");
const con = require("./connection");

const app = express();
const hostname = "bv4yes5gbuhpqn8gsc3z-mysql.services.clever-cloud.com";
const port = "3306";

// app.use(
//   cors({
//     origin: ["http://192.168.43.31:3000", "https://frontend-zr.vercel.app"],
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/", (req, res) => {
  res.send("ok");
  console.log(`Server running at http://${hostname}:${port}/`);
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

// getproduct
app.get("/post-product", (req, res) => {
  res.status(200).json({ msg: "post methode" });

  // try {
  //   con.query("select * from product", function (err, result) {
  //     if (err) throw err;
  //     //   response(200, result, "data produk", res);
  //     res.status(200).json(result);
  //   });
  // } catch (error) {
  //   // response(500, ");
  //   res.status(500).json({ msg: error.message });
  // }
});

// get prduk by id
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  try {
    con.query(`select * from product where id=${id}`, function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// simpan poduk
app.post("/products", (req, res) => {
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `insert into product values('','${nama}','${kat}',${hbeli},${hjual},now())`;
  console.log(sql);
  console.log(nama);
  // try {
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     res.status(200).send(result);
  //   });
  // } catch (error) {
  //   res.status(500).json({ msg: error.message + "error kiboss" });
  // }
});
// update produk
app.patch("/products/:id", cors(), (req, res) => {
  const id = req.params.id;
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `UPDATE product SET nama='${nama}',kat='${kat}',hjual=${hjual},hbeli=${hbeli},createAt=NOW() WHERE id=${id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
// delete produk
app.delete("/products/:id", cors(), (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM product WHERE ID='${id}'`;
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

app.post("/penjualan", cors(), (req, res) => {
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

app.delete("/penjualan/:kode_penjualan", cors(), (req, res) => {
  const kode_penjualan = req.params.kode_penjualan;
  const sql = `DELETE FROM PENJUALAN WHERE KODE_PENJUALAN='${kode_penjualan}'`;
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
  product.hbeli,
  penjualan.id from penjualan LEFT JOIN product on penjualan.kode_barang=product.id where  CAST(penjualan.createAt as date) BETWEEN '${mulai}' and '${sampai}'`;
  // res.send(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
