import { Router, Request, Response } from 'express';
import { Order } from '../models/Order'; // Assuming the Order model is located in the models folder
import { User } from '../models/User';
import { Product } from '../models/Product';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   productId:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   status:
 *                     type: string
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, attributes: ['id', 'name', 'email'] }, // Include user details
                { model: Product, attributes: ['id', 'name', 'price'] }, // Include product details
            ],
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch orders' });
    }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 default: 'Pending'
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity, status } = req.body;

        // Validate request body
        if (!userId || !productId || !quantity) {
            res.status(400).send({ error: 'User ID, Product ID, and Quantity are required' });
            return;
        }

        // Create the new order
        const newOrder = await Order.create({
            userId,
            productId,
            quantity,
            status: status || 'Pending', // Default status to 'Pending' if not provided
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create order' });
    }
});

export default router;
