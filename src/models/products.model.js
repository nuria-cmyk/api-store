const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    departament: String,
    stock: Number,
    available: Boolean,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    //fechas de creación y actualización, el version key es para quitar un campo que es --v
    timestamps: true, versionKey: false
})
//nombre de la colección en singular y el lo crea plural 
const Product = model('product', productSchema)

module.exports = Product