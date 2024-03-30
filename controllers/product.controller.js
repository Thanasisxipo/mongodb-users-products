const Product = require('../models/product.model')
const logger = require('../logger/logger') 

exports.findAll = async(req, res) => {
    console.log('Find all products')
    try {
        const result = await Product.find()
        res.status(200).json({data: result})
        logger.debug("Success in finding all products")
        logger.info("Success in finding all products")
    } catch (err) {
        console.log(`Problem in reading products ${err}`)
        logger.error(`Error in finding all products, ${err}`)

    }
}

exports.findOne = async(req, res) => {
    console.log('Find a product')
    try {
        const id = req.params.id
        const result = await Product.findOne({_id: id})
        res.status(200).json({data: result})
        logger.debug("Success in finding product")
        logger.info("Success in finding product")
    } catch (err) {
        console.log('Problem in finding product')
        logger.error(`Error in finding product, ${err}`)
    }
}

exports.create = async(req, res) => {
    console.log('Insert product')
    
    console.log(req.body)
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    })
    try {
        const result = await newProduct.save()
        res.status(200).json({data: result})
        logger.debug("Success in saving product")
        logger.info("Success in saving product")
    } catch(err) {
        res.status(400).json({data: err})
        console.log('Problem in saving product')
        logger.error(`Error in inserting product, ${err}`)
    }
}

exports.update = async(req, res) => {
    const id = req.params.id

    console.log('Update product with id: ', id)

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate(
            {_id: id},
            updateProduct,
            {new: true}
        )
        res.status(200).json({data: result})
        logger.debug("Success in upgrading product")
        logger.info("Success in upgrading product")
    } catch(err) {
        res.status(400).json({data: err})
        console.log('Problem in updating product with id: ', id)
        logger.error(`Error in updating product, ${err}`)
    }
}

exports.delete = async(req, res) => {
    const id = req.params.id

    console.log('Delete product with id: ', id)
    try {
        const result = await Product.findOneAndDelete({_id: id})
        res.status(200).json({data: result})
        logger.debug("Success in deleting product")
        logger.info("Success in deleting product")
    } catch(err) {
        res.json({data: err})
        console.log('Problem in deleting product')
        logger.error(`Error in deleting product, ${err}`)
    }
}