const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path');

//dotenv
const dotenv = require("dotenv")
dotenv.config();


//dbconnection
const DBConnect = require('./config/db')
DBConnect()

//routers
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set("view engine",'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("Public"))


app.use('/', indexRouter)
app.use('/user',userRouter)

app.listen(3000)