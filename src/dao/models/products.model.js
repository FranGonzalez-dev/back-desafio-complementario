import mongoose from 'mongoose';

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
})

const productModel = mongoose.model( productsCollection, productsSchema );

export default productModel;