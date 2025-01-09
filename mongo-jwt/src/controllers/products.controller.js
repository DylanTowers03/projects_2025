import Product from '../models/Products.js';

export class ProductsController {
    static async getProducts(req, res) {
        const products = await Product.find();
        res.json(products);
    }
    static async getProductById(req, res) {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.json(product);
    }
    static async createProduct(req, res) {
        const { name, category, price, imgURL } = req.body;

        try {
          const newProduct = new Product({
            name,
            category,
            price,
            imgURL,
          });
      
          const productSaved = await newProduct.save();
      
          res.status(201).json(productSaved);
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
    }
    static async updateProduct(req, res) {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate (id, req.body, {new: true});
        res.status(204).json(updatedProduct);
    }
    static async deleteProduct(req, res) {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({
            message: 'Product deleted'
        });
    }
}