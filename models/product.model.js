const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'Product name is required'],
    },
    description: {
        type: String,
        maxlength: 500,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        min: [0, 'Price must be a positive number'],
        required: [true, 'Product price is required'],
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Seller is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Product image URL is required'],
    }
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;