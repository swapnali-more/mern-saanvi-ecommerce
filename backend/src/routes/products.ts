import express from 'express'
import { createProduct, fetchProducts, productDetail } from '../controllers/products'

const router = express.Router()

router.get('/', fetchProducts)

router.post('/', createProduct)

router.get('/:id', productDetail)

export default router