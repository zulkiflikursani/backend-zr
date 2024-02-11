import con from "../config/connection.js";
import { QueryTypes } from "sequelize";
export const getPenjualan = async (req, res) => {
  try {
    con
      .query(
        "select id,nama_barang,hjual,createAt as tanggal,kode_barang,kode_penjualan,qty from penjualan",
        { type: con.QueryType.SELECT }
      )
      .then((result) => {
        res.statu(200).json(result);
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getbykode = async (req, res, next) => {
  const kode = req.params.kode_penjualan;
  try {
    await con
      .query(`SELECT *  from penjualan where kode_penjualan='${kode}'`, {
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// getproduct

// router.get("/:kode_penjualan", (req, res) => {
//   const kode_penjualan = req.params.kode_penjualan;
//   const sql = `SELECT * FROM penjualan WHERE kode_penjualan='${kode_penjualan}'`;
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     res.status(200).send(result);
//   });
// });

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

export const createPenjualan = async (req, res) => {
  let kode_penjualan = "J-" + makeid(5);

  const { data } = req.body;
  var temp = "";
  data.map((data) => {
    temp += `('${data.nama}',${data.hjual},'${data.id}','${kode_penjualan}',${data.qty},now()),`;
  });
  const sql =
    `INSERT INTO penjualan (nama_barang,hjual,kode_barang,kode_penjualan,qty,createAt) VALUES` +
    temp.substring(0, temp.length - 1);
  // res.status(200).json(sql);
  try {
    con.query(sql, { type: QueryTypes.INSERT }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.json({ error: error });
  }
};

export const deletePenjualan = async (req, res) => {
  const kode_penjualan = req.params.kode_penjualan;
  const sql = `DELETE FROM PENJUALAN WHERE KODE_PENJUALAN='${kode_penjualan}'`;
  con.query(sql, { type: QueryTypes.DELETE }).then((result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
};

export const getLapPenjaulan = async (req, res) => {
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
  await con
    .query(sql, {
      //   replacements: { mulai, sampai },
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      res.status(200).json(result);
    });
  // res.status(200).json(sql);
};
