const mongoose = require('mongoose')


//define schema
const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    }
    
},{timestamps:true})

const BlogModel = mongoose.model('blogapi', BlogSchema)

module.exports = BlogModel