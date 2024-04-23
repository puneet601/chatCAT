'use strict'
const express = require('express')
const app = express()
const chatCat = require('./app')
const passport = require('passport')
app.set('port',process.env.PORT||3000)
app.use(chatCat.session)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

app.use('/', chatCat.router)

app.set('view engine','ejs')
app.get('/',(req,res,next)=>{
    res.render("login")
})
app.listen(app.get('port'),()=>{
    console.log("server is listening on port 3000")
})