import { Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        // Validate input
        if (!name || !price || stock === undefined) {
            return res.status(400).json({ error: 'Name, price, and stock are required' });
        }

        const newProduct = await Product.create({ name, description, price, stock });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update an existing product
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
