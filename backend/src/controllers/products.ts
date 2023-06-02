import mongoose from "mongoose";
import ProductsMessage from "../models/productsMessage";

// Fetch the products
export const fetchProducts = async (req: any, res: any) => {
    try {
        const products = await ProductsMessage.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Something went wrong!"})
    }
}

// Create a new product
export const createProduct = async (req: any, res: any) => {
    try {
        const product = req.body;
        const lastProduct = await ProductsMessage.findOne({}, {productId: 1}, {sort: { _id: -1}});
        const lastProductId = lastProduct ? parseInt((lastProduct as any).productId.substring(3), 10) : 0;
        const newProductId = `pro${(lastProductId + 1).toString().padStart(6, '0')}`
        const newProduct = new ProductsMessage({...product, createdDate: new Date().toISOString(), productId: newProductId});
        const savedProduct = await newProduct.save()
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(savedProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Invalid data sent in request."})
    }
}

// Product Details page as per ID
export const productDetail = async (req: any, res: any) => {
    try {
        const productId = req.params.id || '';
        console.log(productId, typeof(productId));
        const productDetail = await ProductsMessage.findOne({productId});

        if (!productDetail) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(productDetail ? productDetail : {});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}
