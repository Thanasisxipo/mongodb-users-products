const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema


let productSchema = new Schema({
    product: { 
        type: String, 
        required: true,
        maxLength: 20,
        trim: true,
        lowercase: true
        },
    cost: {
        type: Number, 
        required: true
    },
    description: { 
        type: String, 
        required: true,
        maxLength: 50,
        lowercase: true
    },
    quantity: { 
        type: Number, 
        required: true
    }
}, 
{
    collection: 'products',
    timestamps: true
})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema)