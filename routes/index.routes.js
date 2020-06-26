let express = require('express');
let app = express();
let users = require('./user.routes');
let login = require('./login.routes');
let products = require('./product.routes');
let lists = require('./lists.routes');



app.use('/login',login);
app.use('/users',users);
app.use('/products',products);
app.use('/lists',lists);



app.get('/',(req,res)=>{
    res.status(200).json({
        ok:'true',
    })
})

module.exports = app;