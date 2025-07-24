import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    size: { type: Array, required: true },
    date: { type: Number },
    bestSeller:{type: Boolean}
})


const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;