const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.AccessKey, (err, decoded)=>{
            if(err){
                res.send({"msg":"wrong token"})
            } else{
                console.log("middleware", decoded, req.body)
                req.body.userID = decoded.userID
                req.body.user = decoded.user
                next()
            }
        })
    } else{
        res.send({"msg":"Please Login , token expires"})
    }
}

module.exports = {auth}