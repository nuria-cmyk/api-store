const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users.model')

const createUser = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 7)
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    //existe el email en la bd
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(401).json({ message: 'Error email y/o contraseña' })
    }

    //coinciden las password

    const equals = await bcrypt.compare(req.body.password, user.password)

    if (!equals) {
        return res.status(401).json({ message: 'Error email y/o contraseña' })
    }
    res.json({
        message: 'Login correcto',
        token: jwt.sign({ user_id: user._id }, 'TUKI TUKI TUKI TUKI')
    })

}

const addProduct = async (req, res, next) => {
    const { productId } = req.params
    req.user.cart.push(productId)
    await req.user.save()
    res.json(req.user)

}
module.exports = {
    createUser,
    login,
    addProduct
}