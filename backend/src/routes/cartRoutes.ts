import { Router } from 'express';
import { Cart } from '../models/Cart';

const router = Router();

// Get cart items for a user
router.get('/:userId', async (req, res) => {
    const cartItems = await Cart.findAll({ where: { userId: req.params.userId } });
    res.json(cartItems);
});

// Add item to cart
router.post('/', async (req, res) => {
    try {
        const cartItem = await Cart.create(req.body);
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
    const cartItem = await Cart.findByPk(req.params.id);
    if (cartItem) {
        await cartItem.destroy();
        res.json({ message: 'Item removed from cart' });
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

export default router;