import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; // Swagger setup
import { Sequelize } from 'sequelize'; // Sequelize for DB connection
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables.');
}


const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Database setup
const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Allows self-signed certificates
        },
    },
    logging: console.log, // Enables SQL query logging
});


// Middleware
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


// Start server and connect to database
(async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync({ alter: true }); // Sync database schema dynamically

        app.listen(PORT, (): void => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Swagger API docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
console.log('Database URL:', process.env.DATABASE_URL);
