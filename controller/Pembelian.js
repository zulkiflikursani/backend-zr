import con from "../config/connection.js";
export const getPembelian = async (req, res) => {
  con
    .query(
      "select id,nama_barang,hbeli,createAt as tanggal,kode_barang,kode_pembelian,qty from pembelian",
      { type: con.QueryTypes.SELECT }
    )
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((error) => {
      console.error("Error executing query:", error);
    });
};
// getproduct

export const getBykode = async (req, res) => {
  const kode_pembelian = req.params.kode_pembelian;
  const sql = `SELECT * FROM pembelian WHERE kode_pembelian='${kode_pembelian}'`;
  con
    .query(sql, { type: con.QueryTypes.SELECT })
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((error) => {
      console.error("Error executing query:", error);
    });
};

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

export const CreatePembelian = async (req, res) => {
  let kode_pembelian = "B-" + makeid(5);

  const { data } = req.body;
  var temp = "";
  data.map((data) => {
    temp += `('${data.nama}',${data.hbeli},'${data.id}','${kode_pembelian}',${data.qty},now()),`;
  });
  const sql = (strings, ...values) => {
    const query = strings.reduce((prev, current, i) => {
      return prev + values[i - 1] + current;
    });
    return query;
  };
  const sqlquery =
    sql`INSERT INTO pembelian (nama_barang,hbeli,kode_barang,kode_pembelian,qty,createAt) VALUES` +
    temp.substring(0, temp.length - 1);
  // res.status(200).json(sql);
  await con
    .query(sqlquery, { type: con.QueryTypes.INSERT })
    .then((results) => {
      console.log(results);
      res.status(200).json("data berhasil disimpan");
    })
    .catch((error) => {
      console.error("Error executing query:", error);
    });
};

export const deletePembelian = async (req, res) => {
  const kode_pembelian = req.params.kode_pembelian;
  const sql = `DELETE FROM pembelian WHERE kode_pembelian='${kode_pembelian}'`;
  await con
    .query(sql, { type: con.QueryTypes.DELETE })
    .then((results) => {
      // console.log(results);
      res.json("data berhasil dihapus");
    })
    .catch((error) => {
      console.error("Error executing query:", error);
    });
};
