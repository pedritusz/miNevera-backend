let express = require('express');
let app = express()
let userSchema = require('../schemas/user.schema')
let bcrypt = require('bcryptjs')
let checkToken = require('../middlewares/checkToken.mw')

app.get('/', checkToken.checkToken, (req, res) => {

    userSchema.find({}, (err, users) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                error: err
            })

        }

        if (!users || users === []) {

            return res.status(404).json({
                ok: false,
                err,
                message: 'no have a users'
            })

        }

        res.status(200).json({

            ok: true,
            users

        })

    })

})

app.post('/', (req, res) => {

    let body = req.body;
    let newUser = new userSchema({
        name: body.name,
        role: body.role,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),

    })

    newUser.save((err, createUser) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                message: err.code === 11000 ? 'the name or email is already in use' : err
            })


        }

        res.status(201).json({

            ok: true,
            createUser

        })

    })

})
module.exports = app;