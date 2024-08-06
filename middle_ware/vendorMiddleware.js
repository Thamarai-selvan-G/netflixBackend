const express = require('express')
const app = express()

      const middleWareChecking =(req,res,next)=>{
            
            const {email,password,userName,mobileNumber,profile} = req.body;

            if (email==undefined||password==undefined||userName==undefined||mobileNumber==undefined||profile==undefined) {
                  return res.json({ message : 'fileds must be set'})

            } else if (email.length==0||password.length==0||mobileNumber.length==0){
                  return res.json({ message : 'you must fill necessary fileds'})

            } else{
                  next() 
            }
      }
      const passwordvalidator = (req,res,next) =>{
            const inputPassword = req.body.password
            const hasUppercase = /[A-Z]/.test(inputPassword)
            const hasSymbol =/[!@#$%^&*()_.,<>]/.test(inputPassword)

            if (!hasSymbol || !hasUppercase) {
                  return res.json({ message : 'password must have a UpperCase or symbol'})
            }
            next()
           }
      
module.exports = {
        middleWareChecking,
        passwordvalidator
}