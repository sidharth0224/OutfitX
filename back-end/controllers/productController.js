import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, size, bestSeller } = req.body;

        // Get images from the request files
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        // Check for duplicate images based on file names
        const imageNames = images.map(img => img.originalname);
        const uniqueImageNames = new Set(imageNames);

        if (uniqueImageNames.size !== imageNames.length) {
            return res.status(400).json({ success: false, message: "Images must be different." });
        }

        // Upload images to Cloudinary and get the secure URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Prepare product data
        const productData = {
            name, 
            description, 
            price: parseFloat(price), 
            category, 
            subCategory, 
            size: Array.isArray(size) ? size : JSON.parse(size), 
            bestSeller: bestSeller === "true" ? true : false,
            images: imagesUrl,
            date: Date.now()
        };

        // Save product to the database
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product added successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Remove product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body; 
        const deletedProduct = await productModel.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };
