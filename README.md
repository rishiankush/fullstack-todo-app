# Go Game: Full Stack To-Do App

This is a monorepo implementation of the Go Game Full Stack Test Assignment, a simple to-do app supporting Android, iOS, and web platforms. The app includes user authentication and is backed by a Node.js/Express backend connected to a PostgreSQL database. The project is fully written in TypeScript.

---

## Features

- **Multi-platform support**: Android, iOS, and Web.
- **User authentication**: Token-based authentication with auto-logout on session expiration.
- **To-do management**: Add, update, and toggle the state of tasks (completed or pending).
- **Concurrent users**: Supports multiple users with isolated sessions.
- **TypeScript**: Complete end-to-end implementation in TypeScript.

---

## Project Structure

The project is organized as a monorepo with the following directories:

```plaintext
apps/
  ├── backend/    # Node.js backend with Express
  ├── mobile/     # React Native mobile app (Android/iOS)
  └── web/        # React web app
```
* * * * *

Prerequisites
-------------

Ensure you have the following installed on your machine:

-   **Node.js** (v18 or higher)
-   **pnpm** (v8 or higher)
-   **PostgreSQL** (v14 or higher)

* * * * *

Setup Instructions
------------------

### 1\. Clone the Repository

bash

Copy code

`git clone <repository-url>
cd go-game-todo`

### 2\. Install Dependencies

Install all dependencies for the monorepo:

bash

Copy code

`pnpm install`

* * * * *

Backend Setup
-------------

### Configuration

1.  **Database Configuration**:

    Update the database connection details in `apps/backend/.env`:

    env

    Copy code

    `DB_URL_DEV=postgres://<username>:<password>@localhost:5432/todo_db
    SECRET_KEY=supersecretkey`

2.  **Run Database Migrations**:

    Create the database and apply migrations:

    bash

    Copy code

    `cd apps/backend
    pnpm prisma db push`

### Run the Backend

Start the backend server:

bash

Copy code

`pnpm dev`

-   Backend runs at: `http://localhost:5001`

* * * * *

Mobile App Setup
----------------

### Configuration

Update the API URL in `apps/mobile/src/services/api.ts` to point to the backend:

ts

Copy code

`const API_URL = 'http://localhost:5001'; // Adjust for your environment`

### Run the Mobile App

1.  **Start Metro Bundler**:

    bash

    Copy code

    `cd apps/mobile
    pnpm start`

2.  **Run on Emulator/Device**:

    -   **iOS**: Open the project in Xcode and run on the simulator.

    -   **Android**: Use Android Studio or run:

        bash

        Copy code

        `pnpm run android`

* * * * *

Web App Setup
-------------

### Configuration

Update the API URL in `apps/web/src/services/api.ts` to point to the backend:

ts

Copy code

`const API_URL = 'http://localhost:5001'; // Adjust for your environment`

### Run the Web App

Start the web app:

bash

Copy code

`cd apps/web
pnpm dev`

-   Web app runs at: `http://localhost:5173`

* * * * *

Using the App
-------------

1.  **Register**:
    -   Navigate to the register page (`/register`) to create a new user with a username and password.
2.  **Login**:
    -   Authenticate using your credentials.
3.  **Manage Todos**:
    -   Add new todos, toggle their state (completed/pending), and manage your tasks from the Todo screen.

* * * * *

Key Features
------------

-   **Session Management**:
    -   Automatically logs out the user when the token expires.
    -   Token is stored securely in `localStorage` for persistence.
-   **Cross-Platform Development**:
    -   Utilizes `React Native CLI` for mobile apps and `Vite` for the web app.
-   **Database**:
    -   PostgreSQL stores user and todo data, ensuring scalability and reliability.

* * * * *

Testing the App
---------------

-   **Backend**:
    -   Use tools like Postman or cURL to test backend APIs at `http://localhost:5001`.
-   **Mobile**:
    -   Test on real devices or emulators.
-   **Web**:
    -   Use a modern browser and navigate to `http://localhost:5173`.

* * * * *
