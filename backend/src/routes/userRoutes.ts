import { Router } from 'express';
import { User } from '../models/User';

const router = Router();

// Register a user
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Authenticate user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

export default router;