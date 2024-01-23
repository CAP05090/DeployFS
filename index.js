const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const {connection} =require("./db")
const {userRouter} = require("./routes/userRoutes")
const {noteRouter} = require("./routes/noteRoute")

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use("/note", noteRouter)

app.get("/", (req, res)=>{
    res.send("home page")
})

app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on PORT ${PORT} and db is also connected`)
    } catch (error) {
        console.log(error)
    }
})