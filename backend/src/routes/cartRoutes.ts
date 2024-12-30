import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     responses:
 *       200:
 *         description: List of cart items
 */
router.get('/', (req, res) => {
    res.send('Get all cart items');
});

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
 *     responses:
 *       201:
 *         description: Item added to cart
 */
router.post('/', (req, res) => {
    res.send('Add item to cart');
});

export default router;