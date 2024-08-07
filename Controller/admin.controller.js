const Model = require('../models')
const adminController = Model.Admin
let bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const { where } = require('sequelize')
const secret = '123456789'
const salt = bcrypt.genSaltSync(10)


let createAdmin = async (req,res) =>{
    try {
        let data = req.body
    let inputEmail =req.body.email
    let inputPassword = req.body.inputPassword

    let checkUserEmail = await adminController.findOne({where : {email :inputEmail}})
    if (!checkUserEmail.length==0) {
        return res.json({ message : 'account alredy created '})
    }

    let hash = await bcrypt.hash(inputPassword,salt)
    data.password = hash

    const create = await adminController.create(data)

    if (!create) {
       return res.status(500).json({ message : 'internal server error...'})
    }

     const genToken =  await jwt.sign({id : data.id},secret,{expiresIn :'2hr'})

     const updateAdmin = await adminController.update({token:genToken},{where : {id : data.id}})

     if (!updateAdmin) {
       return res.status(500).json({ message : 'server error...'})
     }

     return res.status(201).json({ message : 'admin created succesfully...',
                                   result : data
     })
     
    } catch (error) {
        return res.json({ message : error.message})
    }
}



module.exports = {
    createAdmin
}