import { Router } from 'express';
import { Order } from '../models/Order';

const router = Router();

// Get orders for a user
router.get('/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
});

// Create an order
router.post('/', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;