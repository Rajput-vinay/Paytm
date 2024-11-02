const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const {dbConnect} = require('./database/db')
const {rootRouter} = require('./Routes/index')
dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/v1', rootRouter)
dbConnect()
app.listen(process.env.PORT,() =>{
    console.log(`server start at ${process.env.PORT}`)
})

