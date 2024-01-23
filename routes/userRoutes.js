const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/userMoles")

const userRouter = express.Router()

// Register user
userRouter.post("/register", async(req, res)=>{
    const {email, username, password} = req.body
    try {
        bcrypt.hash(password, 7, async(err, hash)=>{
            if(err){
                res.send({"msg":"Some thing went wrong while hashing"})
            } else {
                const user = new UserModel({username, email, password:hash})
                await user.save()
                res.status(200).send({"msg":"New user has been registered"})
            }
        })
    } catch (error) {
        res.send({"msg":"some thing went wrong while registering"})
    }
})

// Login User

userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({userId:user._id, user:user.username}, process.env.AccessKey)
                    res.send({"msg":"login Successful", "token": token})
                } else {
                    res.send({"msg":"Enter Correct Password"})
                }
            })
        } else {
            res.send({"err":"Email not found"})
        }
    } catch (error) {
        res.send({"error":error})
    }
})
module.exports = {userRouter}