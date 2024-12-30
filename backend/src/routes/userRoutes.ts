import { Router, Request, Response } from 'express';
import {User} from "../models/User";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req: Request, res: Response): void => {
    res.send('Get all users');
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/:id', (req: Request<{ id: string }>, res: Response): void => {
    const { id } = req.params;
    res.send(`Get user with ID ${id}`);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Validate request body
        if (!name || !email || !password) {
            res.status(400).send({ error: 'Name, email, and password are required' });
            return;
        }

        // Create user in the database
        const newUser = await User.create({ name, email, password });

        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


export default router;
