const mongoose = require('mongoose');
const express = require('express');

const ProductSchema = mongoose.Schema({
    prod_id: {
        type: Number,
        default: 0,
    },
    prod_name: {
        type: String,
        required: true
    },
    prod_price: {
        type: Number,
        required: true
    },
    quantity: {
        type:Number,
        require:true 
    },
    hsn:{
        type:Number,
        require:true 
    },
    brand_name:{
         type:String,
         require:true       
    }
},{timestamps:true});

// Add a pre-save middleware to auto-increment the prod_id field
ProductSchema.pre('save', async function (next) {
    const product = this;

    if (!product.isNew) {
        return next(); // Only auto-increment for new documents
    }

    try {
        const lastProduct = await Product.findOne().sort({ prod_id: -1 }).exec();
        if (lastProduct) {
            product.prod_id = lastProduct.prod_id + 1;
        } else {
            product.prod_id = 1; // Initial value
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
