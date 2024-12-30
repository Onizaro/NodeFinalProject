import { Router, Request, Response } from 'express';

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
 *     responses:
 *       201:
 *         description: User created
 */
router.post('/', (req: Request, res: Response): void => {
    res.send('Create new user');
});

export default router;
