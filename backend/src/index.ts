import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; // Swagger setup
import { sequelize } from './models'; // Sequelize instance
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

const app: Application = express();
const PORT: number = 3000;

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI setup

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
        await sequelize.sync({ alter: true }); // Create tables dynamically if missing

        app.listen(PORT, (): void => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Swagger API docs at http://localhost:${PORT}/api-docs`);
        });
    } catch (error: unknown) {
        console.error('Unable to connect to the database:', error);
    }
})();
