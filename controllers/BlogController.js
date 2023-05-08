const BlogModel = require('../models/Blog')
cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dkwdscz4l",
    api_key: "388856688969765",
    api_secret: "7S0v5WOk8Yw-0QyIr1HjBj1Wifw",
});




class BlogController {

    static create = async (req, res) => {
        try {
            const file = req.files.image;
            // console.log(file)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "blogApi",
            });
            // console.log(myimage)

            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url,
                },
            })
            await result.save()

            res.status(201).json({
                success: true,
                result
            })

        } catch (error) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {

            const data = await BlogModel.find()
            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            console.log(error)
        }
    }
    static view = async (req, res) => {
        try {
            const data = await BlogModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                data
            })

        } catch (error) {
            console.log(error)
        }
    }
    static update = async (req, res) => {
        try {

            const { title, description } = req.body
            const data = await BlogModel.findByIdAndUpdate(req.params.id, {
                title: title,
                description: description
            })

            res.status(201).json({
                success: true,
                data
            })

        } catch (error) {
            console.log(error)
        }
    }
    static delete = async (req, res) => {
        try {

            const result = await BlogModel.findByIdAndDelete(req.params.id)
            res.status(201).json({
                success: true,
                message: "delete successful"
            })


        } catch (error) {
            console.log(error)
        }
    }








}
module.exports = BlogController