const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb = require('./db/connectdb')
const web = require('./routes/web')
const fileUpload = require("express-fileupload");



app.use(express.json())
// file uploader
app.use(fileUpload({ useTempFiles: true }));



dotenv.config({
    path: '.env'
})

connectdb()
app.use('/api',web)











app.listen(process.env.PORT, () => {
  console.log(`Server is start... ${process.env.PORT}`)
})