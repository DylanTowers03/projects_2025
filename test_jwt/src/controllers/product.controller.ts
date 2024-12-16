import { Request, Response } from 'express';
import { Product, ProductI, ProductType } from '../models/Product';


// Controllers
export class ProductController{
    async create(req: Request, res: Response) {
        try {
          const { name, stock, idProductType } = req.body;
          const product = await Product.create({ name, stock, idProductType });
          res.status(201).json(product);
        } catch (error) {
          res.status(500).json({ message: 'Error creating product', error });
        }
      }
    
      async getAll(req: Request, res: Response) {
        try {
          const products = await Product.findAll({ include: [{ model: ProductType, as: 'productType' }] });
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching products', error });
        }
      }
    
      async getById(req: Request, res: Response): Promise<any> {
        try {
          const { id } = req.params;
          const product = await Product.findByPk(id, { include: [{ model: ProductType, as: 'productType' }] });
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching product', error });
        }
      }
    
      async update(req: Request, res: Response) :Promise <any>{
        try {
          const { id } = req.params;
          const { name, stock, idProductType } = req.body;
          const product = await Product.findByPk(id);
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          await product.update({ name, stock, idProductType });
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ message: 'Error updating product', error });
        }
      }
    
      async delete(req: Request, res: Response): Promise<any> {
        try {
          const { id } = req.params;
          const product = await Product.findByPk(id);
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          await product.destroy();
          res.status(204).send();
        } catch (error) {
          res.status(500).json({ message: 'Error deleting product', error });
        }
      }
}
export class ProductTypeController {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const productType = await ProductType.create({ name });
      res.status(201).json(productType);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product type', error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const productTypes = await ProductType.findAll({ include: [{ model: Product, as: 'products' }] });
      res.status(200).json(productTypes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product types', error });
    }
  }

  async getById(req: Request, res: Response) : Promise<any> {
    try {
      const { id } = req.params;
      const productType = await ProductType.findByPk(id, { include: [{ model: Product, as: 'products' }] });
      if (!productType) {
        return res.status(404).json({ message: 'Product type not found' });
      }
      res.status(200).json(productType);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product type', error });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const productType = await ProductType.findByPk(id);
      if (!productType) {
        return res.status(404).json({ message: 'Product type not found' });
      }
      await productType.update({ name });
      res.status(200).json(productType);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product type', error });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const productType = await ProductType.findByPk(id);
      if (!productType) {
        return res.status(404).json({ message: 'Product type not found' });
      }
      await productType.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product type', error });
    }
  }
}
