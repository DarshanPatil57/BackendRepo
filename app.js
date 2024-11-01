const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config();

const DBConnect = require('./config/db')
DBConnect()

//routers
const userRouter = require('./routes/user.routes')

app.set("view engine",'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("Public"))


app.use('/user',userRouter)


app.listen(3000)