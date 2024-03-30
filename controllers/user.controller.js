const User = require('../models/user.model')
const logger = require('../logger/logger') 

exports.findAll = async(req, res) => {
    console.log('Find all users')
    try {
        const result = await User.find()
        res.status(200).json({data: result})
        logger.debug("Success in finding all users")
        logger.info("Success in finding all users")
    } catch (err) {
        console.log(`Problem in reading users ${err}`)
        logger.error(`Error in finding all users, ${err}`)
    }
}

exports.findOne = async(req, res) => {
    console.log('Find a user')
    try {
        const username = req.params.username
        const result = await User.findOne({username: username})
        res.status(200).json({data: result})
        logger.debug("Success in finding user with username: " + username)
        logger.info("Success in finding user with username: " + username)
    } catch (err) {
        console.log('Problem in reading user')
        logger.error(`Error in finding user, ${err}`)
    }
}

exports.create = async(req, res) => {
    console.log('Insert user')
    
    console.log(req.body)
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })
    try {
        const result = await newUser.save()
        res.status(200).json({data: result})
        logger.debug('User saved')
        logger.info('User saved')
    } catch(err) {
        res.status(400).json({data: err})
        console.log('Problem in saving user')
        logger.error(`Error in saving user, ${err}`)
    }
}

exports.update = async(req, res) => {
    const username = req.params.username

    console.log('Update user with username: ', username)

    const updateUser = {
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate(
            {username: username},
            updateUser,
            {new: true}
        )
        res.status(200).json({data: result})
        logger.debug("Success in upgrading user with username: " + username)
        logger.info("Success in upgrading user with username: " + username)
    } catch(err) {
        res.status(400).json({data: err})
        logger.error(`Error in saving user, ${err}`)
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username

    console.log('Delete user: ', username)
    try {
        const result = await User.findOneAndDelete({username: username})
        res.status(200).json({data: result})
        logger.debug("Success in deleting user with username: " + username)
        logger.info("Success in deleting user with username: " + username)
    } catch(err) {
        res.json({data: err})
        console.log('Problem in deleting user')
        logger.error(`Error in deleting user, ${err}`)
    }
}