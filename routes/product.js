const express = require("express");
const router = express.Router();
const con = require("../connection");

router.get("/", (req, res, next) => {
  try {
    con.query("select * from product", function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
      console.log(result);
    });
  } catch (error) {
    // response(500, ");
    res.status(500).json({ msg: error.message });
  }
});

// get prduk by id
router.get("/:id", (req, res, next) => {
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

// // simpan poduk
router.post("/", (req, res, next) => {
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `insert into product (nama,kat,hbeli,hjual,createAt) values('${nama}','${kat}',${hbeli},${hjual},now())`;

  // res.status(200).json({ data: sql });
  try {
    con.query(sql, function (err, result) {
      // con.release();
      if (err) throw err;
      res.status(200).json({ data: result });
      console.log(result);
    });
  } catch (error) {
    res.status(200).json({ data: error });
  }
});
// update produk
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `UPDATE product SET nama='${nama}',kat='${kat}',hjual=${hjual},hbeli=${hbeli},createAt=NOW() WHERE id=${id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });
});
// delete produk
router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM product WHERE ID='${id}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    // s
    res.status(200).send(result);
    // con.release();
  });
});

module.exports = router;
