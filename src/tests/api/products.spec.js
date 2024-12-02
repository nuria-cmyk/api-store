const app = require('../../app')
const request = require('supertest')
const mongoose = require('mongoose')
const Product = require('../../models/products.model')
let response
describe('API de products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/store')
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    describe('GET /api/products', () => {

        beforeAll(async () => {
            //Codigo ejecuta antes de todas las pruebas
            response = await request(app).get('/api/products').send()
        })

        it('debería retornar status 200', () => {

            expect(response.status).toBe(200)
        })
        it('debería responder con un JSON', () => {
            //Dentro del expect metemos lo que queremos evaluar
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array)
        })
    })

    describe('POST/api/products', () => {

        let response
        let body = { name: 'Goma Casio', description: 'Borra muy bien', price: 1, departament: 'test', stock: 100, available: true }
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body)
        })

        afterAll(async () => {
            //Filtro, como si fuera un where, por lo que lo queremos filtrar
            await Product.deleteMany({ departament: 'test' })
        })

        it('debería responder correctamente la url', () => {
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })

        it('deberia insertar el nuevo producto', () => {
            expect(response.body._id).toBeDefined()
        })

        it('debería ver los datos del body en la BD', () => {
            expect(response.body.name).toBe(body.name)
            expect(response.body.description).toBe(body.description)
            expect(response.body.price).toBe(body.price)
            expect(response.body.departament).toBe(body.departament)
            expect(response.body.stock).toBe(body.stock)
            expect(response.body.available).toBe(body.available)

        })

    })

    describe('PUT/api/products/:productId', () => {
        let response
        let product
        let body = { name: 'Goma Casio', description: 'Borra muy bien', price: 1, departament: 'test', stock: 100, available: true }
        beforeAll(async () => {
            //Creo un producto en la BD 
            product = await Product.create(body)
            //Lanzo la petición 
            response = await request(app).put(`/api/products/${product._id}`).send({ stock: 30, available: false })
        })

        afterAll(async () => {
            await Product.findByIdAndDelete(product._id)
        })
        it('debería responder correctamente la url', () => {
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })
        it('debería responder con el producto actualizado', () => {
            expect(response.body.stock).toBe(30)
            expect(response.body.available).toBe(false)
        })


    })

    describe('DELETE/api/products/:productoId', () => {
        let response
        let product
        let body = { name: 'Goma Casio', description: 'Borra muy bien', price: 1, departament: 'test', stock: 100, available: true }
        beforeAll(async () => {
            //Creo un producto en la BD 
            product = await Product.create(body)
            //Lanzo la petición 
            response = await request(app).delete(`/api/products/${product._id}`).send()
        })
        it('debería responder correctamente la url', () => {
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('application/json')
        })
        it('el producto no debería estar en la BD', async () => {
            const prod = await Product.findById(product._id)
            expect(prod).toBeNull()
        })
    })
})
