# Go Game: Full Stack To-Do App

This repository is the implementation of the Go Game Full Stack Test Assignment, featuring a simple to-do app designed to support Android, iOS, and web platforms. The app includes user authentication and is backed by a Node.js/Express backend connected to a PostgreSQL database. It is fully written in TypeScript.

---

## Features

- **Multi-platform support**: Android, iOS, and Web.
- **User authentication**: Token-based authentication with auto-logout on session expiration.
- **To-do management**: Add, update, and toggle tasks between completed or pending.
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
