import { Router, Request, Response } from 'express';
import { Cart } from '../models/Cart'; // Assuming the Cart model is in the models folder
import { User } from '../models/User';
import { Product } from '../models/Product';

const router = Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     responses:
 *       200:
 *         description: List of cart items
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
 *                   product:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetching all cart items along with user and product details
        const cartItems = await Cart.findAll({
            include: [
                { model: User, attributes: ['id', 'name', 'email'] }, // Including user details
                { model: Product, attributes: ['id', 'name', 'price'] }, // Including product details
            ],
        });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch cart items' });
    }
});

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
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
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Bad request
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate request body
        if (!userId || !productId || !quantity) {
            res.status(400).send({ error: 'User ID, Product ID, and Quantity are required' });
            return;
        }

        // Check if the user and product exist (optional but a good practice)
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            res.status(404).send({ error: 'User or Product not found' });
            return;
        }

        // Create a new cart item
        const newCartItem = await Cart.create({
            userId,
            productId,
            quantity,
        });

        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add item to cart' });
    }
});

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Delete an item from the cart
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cart item to remove
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Item not found
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Find the cart item by ID
        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            res.status(404).send({ error: 'Cart item not found' });
            return;
        }

        // Delete the cart item
        await cartItem.destroy();
        res.status(200).send({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to remove item from cart' });
    }
});

export default router;
