const { getProducts, createProduct, updateProduct, deleteProduct, getProductsById, getByPrice, getActive } = require('../../controllers/products.controller')
const { checkToken } = require('../../middlewares/users.middleware')

const router = require('express').Router()

router.get('/', getProducts)
router.get('/price/:minPrice/:maxPrice', getByPrice)
router.get('/actives', getActive)
router.get('/:productId', getProductsById)
router.post('/', checkToken, createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

module.exports = router