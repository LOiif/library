require('dotenv').config()
const express = require('express')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api', router)
app.use(errorMiddleware)


const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log(`Started on ${PORT} port`)
        })
    } catch (e: any) {
        console.log(e)
    }
}

start()