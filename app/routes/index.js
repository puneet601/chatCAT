'use strict'
const passport = require('passport')
const h = require('../helpers')
module.exports = () =>{
    let routes = {
        'get':{
            '/':(req,res,next) => {
                res.render('login')
            },
            '/rooms':[h.isAuthenticated,(req,res,next) => {
                res.render('rooms',{
                    user:req.user
                })
            }],
            '/chat':[h.isAuthenticated,(req,res,next)=>{
                res.render('chatroom')
            }],
            '/getSession':[h.isAuthenticated,(req,res,next)=>{
                res.send("session returned favcolor as" +req.session.favColor)
            }],
            '/setSession':[h.isAuthenticated,(req,res,next)=>{
                req.session.favColor = "Pink"
                res.send("session set successfully")
            }],
            '/auth/facebook':passport.authenticate('facebook'),
            '/auth/facebook/callback':passport.authenticate('facebook',{
                'successRedirect':'/rooms',
                'failureRedirect':'/'
            }),
            '/auth/twitter':passport.authenticate('twitter'),
            '/auth/twitter/callback':passport.authenticate('twitter',{
                'successRedirect':'/rooms',
                'failureRedirect':'/'
            }),
            '/logout':[h.isAuthenticated,(req,res,next)=>{
                req.logout = true
                res.redirect('/')
            }]
        },
        'post':{

        },
        'NA':(req,res,next)=>{
            res.status(404).sendFile(process.cwd()+"/views/404.htm")
        }
    }
    
    return h.route(routes);
}