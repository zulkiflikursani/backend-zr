import express from "express";
import {
  getProduct,
  CreateProduct,
  getPorductById,
  UpdateProduct,
  DeleteProduct,
} from "../controller/Product.js";
const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getPorductById);
router.post("/", CreateProduct);
router.patch("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

export default router;
