import express from "express";
import {
  getPenjualan,
  createPenjualan,
  getbykode,
  deletePenjualan,
  getLapPenjaulan,
} from "../controller/Penjualan.js";
const router = express.Router();
router.get("/", getPenjualan);
router.get("/laporan", getLapPenjaulan);
router.get("/:kode_penjualan", getbykode);
router.post("/", createPenjualan);
router.delete("/kode_penjualan", deletePenjualan);

export default router;
