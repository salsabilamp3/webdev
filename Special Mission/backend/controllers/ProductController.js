import Product from "../models/ProductModel.js";
import path from 'path';
import fs from 'fs';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.log(err);
    }
}

export const getProductsById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.json(product);
    } catch (err) {
        console.log(err);
    }
}

export const saveProduct = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg: 'No file uploaded'});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    if(!allowedExtensions.includes(ext.toLowerCase())) return res.status(422).json({msg: 'Invalid Images'});
    if(fileSize > 5000000) return res.status(422).json({msg: 'Image size must be less than 5 MB'});

    file.mv(`./public/images/${fileName}`, async err => {
        if(err) {
            console.log(err);
            return res.status(500).json({msg: err.message});
        }
    });

    try {
        const product = await Product.create({
            name: name,
            image: fileName,
            url: url
        });
        res.status(201).json({msg: 'Product created successfully'});
    } catch (err) {
        console.log(err.message);
    }
}

export const updateProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) return res.status(404).json({msg: 'Product not found'});
    let fileName = "";
    if(req.files === null) {
        fileName = product.image;
    } else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

        if(!allowedExtensions.includes(ext.toLowerCase())) return res.status(422).json({msg: 'Invalid Images'});
        if(fileSize > 5000000) return res.status(422).json({msg: 'Image size must be less than 5 MB'});

        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, err => {
            if(err) {
                console.log(err);
                return res.status(500).json({msg: err.message});
            }
        });
    }
    try {
        await product.update({
            name: req.body.title,
            image: fileName,
            url: `${req.protocol}://${req.get('host')}/images/${fileName}`
        },{
            where: {
                id: req.params.id
            }});
        res.status(200).json({msg: 'Product updated successfully'});
    } catch (err) {
        console.log(err);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product) return res.status(404).json({msg: 'Product not found'});
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await product.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: 'Product deleted successfully'});
    } catch (err) {
        console.log(err);
    }
}