let express = require('express');
let app = express();
let users = require('./user.route')
let login = require('./login.routes')



app.use('/login',login);
app.use('/users',users);



app.get('/',(req,res)=>{
    res.status(200).json({
        ok:'trueee',
    })
})

module.exports = app;