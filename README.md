# 🛒 BuildCart – Full-Stack MERN E-Commerce Application

BuildCart is a full-stack e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).
The project demonstrates real-world e-commerce features including authentication, product management, cart persistence, and order processing.

---

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user registration and login using **JWT**
- Role-based access control:

  - **User**: browse products, manage cart, place orders
  - **Admin**: manage products and view all orders

---

### 🛍 Product Management

- Product listing with:

  - Name
  - Price
  - Description
  - Image
  - Stock quantity
  - Category

- Category-based filtering
- Product search functionality
- Admin-only product creation and deletion

---

### 🛒 Cart System

- Add products to cart
- Update item quantities
- Remove items from cart
- Persistent cart stored in MongoDB
- Cart state synced across sessions

---

### 📦 Order Management

- Place orders directly from cart
- Orders stored with:

  - User details
  - Products and quantities
  - Total amount
  - Order date

- Users can view their order history
- Admin can view all user orders

---

### 🎨 Frontend

- Built with **React + Vite**
- Styled using **Tailwind CSS**
- State management via **Context API**
- Fully responsive layout

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- TypeScript
- Tailwind CSS
- Context API

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hridayesh-arya/BuildCart.git
cd buildcart
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌱 Seed Sample Products

To populate the database with sample products:

```bash
cd backend
node seed-products.js
```

This inserts categorized products for testing and development.

---

## 🔑 Sample Credentials

### Admin

```
Email: admin@buildcart.com
Password: admin123
```

### User

```
Email: test@user.com
Password: 123456
```

---

## 📂 Project Structure

```
buildcart/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── types/
│   └── index.html
```

---

## 👨‍💻 Author

Made with ❤️ by **Hridayesh**

---
