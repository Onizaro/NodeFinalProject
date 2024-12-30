import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', (req: Request, res: Response): void => {
    res.send('Get all orders');
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', (req: Request, res: Response): void => {
    res.send('Create new order');
});

export default router;
