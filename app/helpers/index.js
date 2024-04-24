'use strict'
const router = require('express').Router()
const db = require('../db')
let registerRoutes = (routes,method) => {
    for(let key in routes){
        if(typeof routes[key] === 'object' && routes[key]!==null && !(routes[key] instanceof Array)){
            registerRoutes(routes[key],key)
        }else{
            if(method === 'get'){
                router.get(key,routes[key])
            }else if(method == 'post'){
                router.post(key,routes[key])
            }else
            router.use(routes['NA'])
        }
    }
}

let findOne = profileId => {
    return db.userModel.findOne({
        'profileId' : profileId
    })
}

let createNewUser = profile => {
    return new Promise((resolve,reject)=>{
        let newUser = new db.userModel({
            profileId:profile.id,
            fullName:profile.displayName,
            profilePic:profile.photos[0].value || ''
        })

        newUser.save((error)=>{
            if(error){
            console.log(error)
            reject(error)
            }else{
                resolve(newUser)
            }
        })
    })
}

const findById = id => {
    return new Promise((resolve,reject)=>{
        db.userModel.findById(id,(error,user)=>{
            if(error){
                reject(error)
            }else{
                resolve(user)
            }
        })
    })
}

const isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated){
        next();
    }else{
        res.redirect('/')
    }
}

const route = (routes) => {
    registerRoutes(routes)
    return router
}

module.exports = {
    route,
    findOne,
    createNewUser,
    findById,
    isAuthenticated
}