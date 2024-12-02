

const { Schema, model, SchemaType } = require('mongoose')
const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    roles: {
        type: String,
        enum: ['regular', 'admin']
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
}, {
    timestamps: true, versionKey: false
})

const User = model('user', userSchema)
module.exports = User