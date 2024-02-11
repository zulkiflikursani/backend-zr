import express from "express";
import {
  getPembelian,
  getBykode,
  CreatePembelian,
} from "../controller/Pembelian.js";
const router = express.Router();

router.get("/", getPembelian);
router.get("/:kode_pembelian", getBykode);
router.post("/", CreatePembelian);

export default router;
