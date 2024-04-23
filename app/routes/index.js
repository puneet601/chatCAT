'use strict'
const passport = require('passport')
const h = require('../helpers')
module.exports = () =>{
    let routes = {
        'get':{
            '/':(req,res,next) => {
                res.render('login')
            },
            '/rooms':(req,res,next) => {
                res.render('rooms')
            },
            '/chat':(req,res,next)=>{
                res.render('chatroom')
            },
            '/getSession':(req,res,next)=>{
                res.send("session returned favcolor as" +req.session.favColor)
            },
            '/setSession':(req,res,next)=>{
                req.session.favColor = "Pink"
                res.send("session set successfully")
            },
            '/auth/facebook':passport.authenticate('facebook'),
            '/auth/facebook/callback':passport.authenticate('facebook',{
                'successRedirect':'/rooms',
                'failureRedirect':'/'
            })
        },
        'post':{

        },
        'NA':(req,res,next)=>{
            res.status(404).sendFile(process.cwd()+"/views/404.htm")
        }
    }
    
    return h.route(routes);
}