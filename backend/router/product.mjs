import express from "express";
const ProductRouter = express.Router();
import cors from "cors";
ProductRouter.use(express.json());
ProductRouter.use(cors());
import ProductInfo from "../handlers/product.mjs";

ProductRouter.get("/product/productlist", ProductInfo.DisplayProduct);
ProductRouter.post("/product/addproductinfo", ProductInfo.AddProductInfo);
ProductRouter.delete("/product/deleteproduct", ProductInfo.DeleteProduct);
ProductRouter.post("/updateproduct", ProductInfo.UpdateProduct);

export default ProductRouter;
