import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: Number, // change data type to Number
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    productCategory: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productSizes: {
        type: [String],
        required: true
    }
})

const ProductsMessage = mongoose.model('Products', productsSchema)

export default ProductsMessage