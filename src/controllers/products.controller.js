const Product = require('../models/products.model')


const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('owner', '-_id username email')
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const getProductsById = async (req, res, next) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getByPrice = async (req, res, next) => {
    const { minPrice, maxPrice } = req.params
    try {
        const products = await Product.find({
            price: {
                $gt: minPrice, //gte mayor o igual 
                $lte: maxPrice //lt menor
            }
        })
        res.json(products)
    } catch (error) {
        next(error)
    }
}


const getActive = async (req, res, next) => {
    try {
        const products = await Product.find({
            stock: {
                $gt: 10,
            },
            available: true
        })
        res.json(products)
    } catch (error) {
        next(error)
    }
}
const createProduct = async (req, res, next) => {
    req.body.owner = req.user._id
    try {
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true })
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await Product.findByIdAndDelete(productId)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsById,
    getByPrice,
    getActive

}