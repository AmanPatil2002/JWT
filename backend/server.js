const express = require('express');
require('dotenv').config()
const cors = require('cors')

const app = express()
const authRoutes = require("./routes/authRoutes");

PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)


app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
})