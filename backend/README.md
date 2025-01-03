## Backend README

### Overview
This document provides an overview and usage instructions for the backend server of our clothing e-commerce project. The backend is built using Node.js with Express and TypeScript, adhering to strict type enforcement and coding standards. It handles the business logic, database interactions, and exposes RESTful APIs for the frontend.

### Features
- **Framework**: Node.js with Express
- **TypeScript**: Ensures strong typing and reduces runtime errors.
- **Database**: PostgreSQL integration for managing product, user, and order data.
- **CRUD Operations**: Supports Create, Read, Update, and Delete operations for managing products and user information.
- **Swagger Documentation**: Provides an OpenAPI interface for exploring and testing API endpoints.
- **Data Validation**: Input validation and error handling for secure and robust APIs.

### File Structure
```
backend/
├── src/
│   ├── models/         # Defines data schemas and interfaces
│   │   ├── Cart.ts     # Cart model
│   │   ├── Order.ts    # Order model
│   │   ├── Product.ts  # Product model
│   │   └── User.ts     # User model
│   ├── routes/         # API route definitions
│   │   ├── cartRoutes.ts    # Routes for cart operations
│   │   ├── orderRoutes.ts   # Routes for order operations
│   │   ├── productRoutes.ts # Routes for product operations
│   │   └── userRoutes.ts    # Routes for user operations
│   ├── swagger.ts      # Swagger configuration for API documentation
│   ├── index.ts        # Entry point of the application
├── package-lock.json   # Dependency lock file
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Backend documentation
```

### Recent Changes
- **cartRoutes** and **orderRoutes** have been updated to support new business requirements.
- Fixed issues with `any` types in `index.ts` and made necessary adjustments to `tsconfig.json` for stricter typing.
- Swagger documentation added for easier API testing.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Onizaro/NodeFinalProject.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and configure database credentials and other settings.
   - DATABASE_URL=postgresql://online_shop_owner:pXeM7zu0hNOy@ep-icy-math-a22mm3go.eu-central-1.aws.neon.tech/online_shop?sslmode=require 
   - PORT=3000
   - CLIENT_ORIGIN=http://localhost:4200
   
   

4. Start the server:
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:3000` by default.

### API Documentation
Swagger is integrated for API exploration. After starting the server, visit the following URL:
```
http://localhost:3000/api-docs
```
This page lists all available endpoints with their request and response structures.

### Key Endpoints
#### Products
- **GET** `/api/products` - Retrieve all products
  
![image](https://github.com/user-attachments/assets/7a21e5b6-3127-421a-8fd5-92d339b069c9)

- **POST** `/api/products` - Add a new product
  
![image](https://github.com/user-attachments/assets/260c93cf-add7-4850-9146-46a94a09dfcf)

- **PUT** `/api/products/:id` - Update a product
  
![image](https://github.com/user-attachments/assets/e322fab9-888d-4475-99a2-608e68b29d73)

- **DELETE** `/api/products/:id` - Delete a product
  
![image](https://github.com/user-attachments/assets/6ec104f8-2056-4fee-b340-b7195438c2da)
 
#### Users
- **GET** `/api/users` - Retrieve all users
  
![image](https://github.com/user-attachments/assets/7f2f3d9b-575f-4cac-8729-681195d93030)

- **POST** `/api/users` - Add a new user
  
![image](https://github.com/user-attachments/assets/c1a14918-4af8-4cb0-bfe8-47cc033a2e4f)

- **PUT** `/api/users/:id` - Update a user
- **DELETE** `/api/users/:id` - Delete a user

#### Cart
- **GET** `/api/cart` - Retrieve cart items
  
![image](https://github.com/user-attachments/assets/9039ee37-426f-4eab-94dc-16f7fab0f348)
  
- **POST** `/api/cart` - Add items to the cart
  
![image](https://github.com/user-attachments/assets/6190150e-3f7c-4721-a9a7-0d3859d8675c)
  
- **DELETE** `/api/cart/:id` - Remove items from the cart

#### Orders
- **GET** `/api/orders` - Retrieve all orders
  
![image](https://github.com/user-attachments/assets/d34a84ee-1767-4d10-917f-f128760ec728)

- **POST** `/api/orders` - Create a new order
  
![image](https://github.com/user-attachments/assets/1891b7ff-0ac9-4848-ae20-fc565ceb9b1a)


### Points of Improvement
- **WebSocket Implementation**: Adding real-time updates for order and stock status.
- **Enhanced Validation**: Strengthening input validation using libraries like Joi.
- **Advanced Search Filters**: Enable complex product filtering by categories, sizes, and price range.
- **File Upload**: Implement drag-and-drop file upload for product images.
- **Categorization**: Adding features to categorize clothes by type and size.

### Code Quality
The backend code adheres to industry-standard naming conventions:
- Classes and interfaces: `PascalCase`
- Variables and methods: `camelCase`

Code is modular, enabling easy debugging and future extensions. Each module (controller, service, route) handles a specific responsibility.

### Database Design
The database schema is designed to support:
- **Products**: Stores product details such as name, type, size, price, and stock quantity.
- **Users**: Stores user credentials and profile information.
- **Orders**: Tracks user orders, including purchased items and quantities.

Tables are normalized to ensure data consistency and minimize redundancy. Indexing is applied to frequently queried fields for performance optimization.

### Testing and Validation
- Unit tests are implemented for key business logic.
- API testing is facilitated via Swagger and Postman.

This backend is a robust and scalable solution, providing the necessary infrastructure for a modern e-commerce platform.

