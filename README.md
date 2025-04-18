# User Management Backend

This is the backend for a user management system, developed with Node.js, Express, and Prisma. The project follows best practices in architecture, separating responsibilities between controllers, services, and repositories.

## 🚀 Technologies Used

-   **Node.js**: Runtime environment for server-side JavaScript.
-   **Express**: Framework for building REST APIs.
-   **TypeScript**: Superset of JavaScript that adds static typing.
-   **Prisma**: ORM for database interaction.
-   **Zod**: Library for schema validation.
-   **Bcrypt**: Library for password hashing.
-   **JWT (jsonwebtoken)**: For authentication and authorization.
-   **ESLint**: Tool for static code analysis.
-   **Prettier**: For code formatting.

---

## 📂 Project Structure

```plaintext
src/
├── controllers/         # Controllers handling HTTP requests
├── middlewares/         # Middlewares for authentication and validation
├── repositories/        # Repositories for database access
│   ├── prisma/          # Prisma-specific implementations
├── routes/              # Application route definitions
├── services/            # Services containing business logic
├── database/            # Prisma configuration and database connection
├── error/               # Classes and utilities for error handling
└── schema/              # Validation schemas using Zod
```

---

## 🛠️ Prerequisites

Before starting, you will need the following tools installed:

-   Node.js (version 16 or higher)
-   npm or yarn
-   Docker (optional, for running the database)

---

## ⚙️ Environment Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/KINZEE97/users-manegment-api.git
    cd users-manegment-api.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    - Create a `.env` file in the root of the project with the following variables:
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
        SECRET_JWT_KEY="your_secret_key"
        ```

4. Set up the database:
    - Ensure the database is running.
    - Run Prisma migrations:
        ```bash
        npx prisma migrate dev
        ```

---

## ▶️ How to Start the Project

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Access the API at:
    ```
    http://localhost:3000
    ```

---

## 🔑 Main Routes

### **User Routes**

-   `POST /user`: Register a new user.
-   `GET /user`: User login.

### **Admin Routes**

-   `GET /admin`: List all users (requires authentication).
-   `GET /admin/user/:id`: Retrieve a user by ID (requires authentication).
-   `POST /admin`: Create a new admin (requires authentication).
-   `PUT /admin/:userId`: Update a user's data (requires authentication).
-   `DELETE /admin/:userId`: Delete a user by ID (requires authentication).

---

## 🧪 Tests

To run tests (if configured), execute:

```bash
npm test
```

---

## 🐳 Using Docker (Optional)

If you prefer to run the database with Docker, use the following command:

```bash
docker-compose up -d
```

Ensure the `docker-compose.yml` file is properly configured.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.
