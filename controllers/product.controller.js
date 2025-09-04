const mongoose = require('mongoose');
const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
    try {
        let products;
        if(req.query.name){
            products = await Product.find({ name: {'$regex': `.*${req.query.name}.*`, '$options': 'i'}});
        }else {
            products = await Product.find({});
        }
        if(products) {
            return res.status(202).json(products);
        } else {
            return res.status(400).json({message: 'An error has occurred!'});
        }
    }catch (error){
        return res.status(400).send({message:error.message});
    }
};

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findById({_id: req.params.id});

        if(product) {
            return res.status(202).json(product);
        }else {
            return res.status(400).json({message: 'An error has occurred.'});
        }
    }catch (error) {
        return res.statys(400).send({message: "Product not found."});
    }
};

exports.createProduct = async (req, res) => {
    try {
        let product = req.body;
        const newProduct = await Product.create(product);

        if(newProduct) {
            return res.status(201).send({ message: "Product created!", data: newProduct });
        } else {
            return res.status(400).send({ message: "An error has occurred! Product not created!" });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        
        const product = req.body;

        const productUpdated = await Product.findByIdAndUpdate(productId, { $set: product }, { new: true });

        if(productUpdated) {
            return res.status(202).send({ message: "Product updated!", data: productUpdated });
        } else {
            return res.status(400).send({ message: "An error has occurred! Product not updated!" });
        }
    
    }catch (error) {
        return res.status(400).send(error.message);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const productDeleted = await Product.findByIdAndDelete(productId);

        if(productDeleted) {
            return res.status(202).send({ message: "Product deleted!" });
        } else {
            return res.status(400).send({ message: "An error has occurred! Product not deleted!" });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
};