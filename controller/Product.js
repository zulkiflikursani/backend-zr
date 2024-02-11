import con from "../config/connection.js";

export const getProduct = async (req, res, next) => {
  con
    .query("SELECT * FROM product", { type: con.QueryTypes.SELECT })
    .then((results) => {
      // console.log(results);
      res.json(results);
    })
    .catch((error) => {
      console.error("Error executing query:", error);
    });
};

export const getPorductById = async (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  try {
    con
      .query(`select * from product where id=${id}`, {
        type: con.QueryTypes.SELECT,
      })
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// // simpan poduk
export const CreateProduct = async (req, res, next) => {
  const { nama, kat, hjual, hbeli } = req.body;
  const sql = `insert into product (nama,kat,hbeli,hjual,createAt) values('${nama}','${kat}',${hbeli},${hjual},now())`;
  try {
    con.query(sql, { TYPE: con.QueryTypes.INSERT }).then((result) => {
      res.status(201).json({ data: result, message: "created" });
    });
  } catch (error) {
    res.status(200).json({ data: error });
  }
};
// update produk

export const UpdateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { nama, kat, hjual, hbeli } = req.body;
  // res.status(200).json({ message: "patch method" });
  const sql = `UPDATE product SET nama='${nama}',kat='${kat}',hjual=${hjual},hbeli=${hbeli},createAt=NOW() WHERE id=${id}`;
  try {
    con
      .query(sql, {
        type: con.QueryTypes.UPDATE,
      })
      .then((result) => {
        res.status(201).json({ data: result.date, message: "updated" });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// delete produk
export const DeleteProduct = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM product WHERE ID='${id}'`;
  try {
    con.query(sql, { type: con.QueryTypes.DELETE }).then((result) => {
      res.status(200).json({ message: "deleted" });
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// export default router;
