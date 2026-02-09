# Virtual Store API

REST API for an e-commerce platform, designed to support product, order
and user management for the Virtual Store UI frontend.

🔧 **Status:** In progress (Release 0.1)

## 🔗 Live Endpoint (if available)
https://virtual-store-api.vercel.app

---

## 📝 Overview
This API provides the backend infrastructure for the Virtual Store project. It
exposes RESTful endpoints to manage products, users and orders. Designed with
scalability in mind, the API is built using Node.js and Express in TypeScript.

---

## ✨ Features
- Products CRUD (Create, Read, Update, Delete)
- Orders CRUD (in-progress)
- User skeleton (planned authentication)
- RESTful design
- Ready for database integration and auth

---

## 🧱 Tech Stack
- Node.js
- Express
- TypeScript
- REST API conventions

---

## 🧠 Project Structure
virtual_store_api/
├── config/            # Configuration files and constants
├── controllers/       # Route logic and handlers
├── models/            # Data models and interfaces
├── routes/            # Express route definitions
├── .gitignore
├── package.json
├── tsconfig.json
├── api.js             # Main entrypoint for the server
└── README.md


---

## 📥 Installation & Local Setup
```bash
# Clone repository
git clone https://github.com/pdroAlves77/virtual_store_api.git
cd virtual_store_api

# Install dependencies
npm install

# Start dev server
npm run dev
****
