const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class UserController{

     static userRegister = async (req, res)=>{
        try{
           
            const {name,email,password,confirmpassword} = req.body
            const user = await UserModel.findOne({email:email})

            if(user){
                res.status(401).json({
                    success: true,
                    message:  "Email already exist"
                })
            }else{
                if(name && email && password && confirmpassword){
                    if(password == confirmpassword){

                        const hashpassword = await bcrypt.hash(password,10)

                        const register = await UserModel({
                            name: name,
                            email: email,
                            password: hashpassword
                           
                        })
                        await register.save()
                        res.status(401).json({
                            success: true,
                            message:  "Registration successfuly",
                            register
                        })

                    }else{
                        res.status(401).json({
                            success: true,
                            message:  "password and confirmpassword does not matched"
                        })
                    }
                    
                }else{
                    res.status(401).json({
                        success: true,
                        message:  "all fields are required"
                    })

                }

            }
           
        }catch(error){
            console.log(error)
        }
    }

    static veryfyLogin = async (req, res)=>{
        try{
           // console.log(req.body)
           const {email, password} = req.body
           if(email && password){
            
            const user = await UserModel.findOne({email:email})
            if(user != null){

                const ismatched = await bcrypt.compare(password,user.password)

                if(ismatched){
                    //generate jwt
                    const token = jwt.sign({id:user._id}, 'ankityadav123')
                   // console.log(token)
                   res.cookie('token',token)
                   res.status(401).json({
                    success: true,
                    message:  "login successfully",
                    token: token,
                    user,

                })


                }else{

                    res.status(401).json({
                        success: true,
                        message:  "Email or password does not matched"
                    })
                }

            }else{
                res.status(401).json({
                    success: true,
                    message:  "You are not registered"
                })
            }

           }else{
            res.status(401).json({
                success: true,
                message:  "All fields are required"
            })

           }

        }catch(error){
            console.log(error)
        }
    }











}
module.exports = UserController