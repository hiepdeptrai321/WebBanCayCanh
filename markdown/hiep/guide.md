# Plant Shop Project – Basic Setup Guide for AI Agent

This document instructs an AI agent to create only the **basic project skeleton** for the Plant Shop application.

The agent must work **step by step** and should **not implement business logic, UI details, database content, or application features yet**.

The goal is only to prepare a clean development foundation for the team.

---

## 1. Scope

The agent should only do these things:

* create the root project structure
* create the frontend folder structure
* create the backend folder structure
* install the basic dependencies
* create placeholder files
* set up routing skeleton
* set up server skeleton
* create configuration placeholders

The agent must **not** do these things yet:

* build real page content
* design final UI
* implement cart logic
* implement checkout logic
* implement admin logic
* connect real MongoDB data
* write real CRUD logic
* add sample business data unless required as placeholder

---

## 2. Tech Stack

The project uses:

* **Frontend:** React + Vite + TailwindCSS
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas

At this stage, only create the setup and basic folders.

---

## 3. Step 1 – Create Root Project Structure

The agent should create this root structure first:

```txt
plant-shop/
├── client/
├── server/
├── docs/
├── README.md
└── .gitignore
```

Notes:

* `client` is for the React frontend
* `server` is for the Node.js backend
* `docs` is for markdown documentation

---

## 4. Step 2 – Set Up Frontend Project

Inside `client`, the agent should initialize a **React project with Vite**.

Required setup:

* create Vite React app
* install basic dependencies
* prepare TailwindCSS
* install React Router

Dependencies to install:

```txt
react
react-dom
react-router-dom
tailwindcss
postcss
autoprefixer
```

The agent should only configure the base environment. Do not build real UI yet.

---

## 5. Step 3 – Create Frontend Folder Structure

Inside `client/src`, create this structure:

```txt
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/
│   ├── layout/
│   └── product/
├── pages/
│   ├── Home/
│   ├── Products/
│   ├── Cart/
│   ├── Checkout/
│   └── Admin/
├── layouts/
├── routes/
├── context/
├── services/
├── utils/
├── App.jsx
└── main.jsx
```

Important:

* create folders even if some are empty for now
* create only the basic files needed to make the app structure clear

---

## 6. Step 4 – Create Frontend Placeholder Files

The agent should create these basic placeholder files:

```txt
src/components/layout/Header.jsx
src/components/layout/Footer.jsx
src/components/layout/Navbar.jsx
src/layouts/MainLayout.jsx
src/routes/AppRoutes.jsx
src/pages/Home/HomePage.jsx
src/pages/Products/ProductsPage.jsx
src/pages/Cart/CartPage.jsx
src/pages/Checkout/CheckoutPage.jsx
src/pages/Admin/AdminDashboard.jsx
src/context/CartContext.jsx
src/services/productService.js
src/services/orderService.js
src/utils/formatCurrency.js
```

Each file should contain only minimal placeholder code.

Example placeholder:

```jsx
function HomePage() {
  return <div>Home Page</div>
}

export default HomePage
```

Do not add full feature implementation.

---

## 7. Step 5 – Set Up Basic Frontend Routing

The agent should create a routing skeleton using `react-router-dom`.

Routes to prepare:

```txt
/
/products
/cart
/checkout
/admin
```

Requirements:

* use a central route file
* use a shared layout
* each page should render only placeholder text for now

Do not add advanced route guards or complex navigation logic.

---

## 8. Step 6 – Set Up Backend Project

Inside `server`, the agent should initialize a **Node.js + Express** project.

Install dependencies:

```txt
express
mongoose
cors
dotenv
nodemon
```

The backend should only have a basic server setup at this stage.

---

## 9. Step 7 – Create Backend Folder Structure

Inside `server`, create this structure:

```txt
server/
├── config/
│   └── db.js
├── models/
│   ├── Product.js
│   └── Order.js
├── controllers/
│   ├── productController.js
│   └── orderController.js
├── routes/
│   ├── productRoutes.js
│   └── orderRoutes.js
├── middleware/
├── .env
├── server.js
└── package.json
```

Important:

* create all folders and files
* keep the content minimal
* do not implement full business logic yet

---

## 10. Step 8 – Create Backend Placeholder Files

The agent should create placeholder content for backend files.

Examples:

### `server.js`

* initialize Express
* enable JSON parsing
* enable CORS
* register placeholder routes
* start server

### `config/db.js`

* create MongoDB connection function using Mongoose
* use `process.env.MONGO_URI`
* do not hardcode secrets

### `models/Product.js` and `models/Order.js`

* create empty or minimal schemas only
* avoid detailed validation for now

### `controllers/*`

* export placeholder functions

### `routes/*`

* register placeholder endpoints

Do not implement full CRUD logic yet.

---

## 11. Step 9 – Add Environment and Ignore Files

The agent should prepare:

### `.gitignore`

```txt
node_modules
.env
dist
```

### `.env`

Create placeholder variables only:

```txt
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not use real credentials.

---

## 12. Step 10 – Add Basic Documentation Files

Inside `docs`, create placeholder markdown files:

```txt
docs/
├── TASK_ASSIGNMENT.md
├── PROJECT_STRUCTURE.md
└── API_DOCUMENTATION.md
```

These files can contain only a title or short placeholder content for now.

---

## 13. Step 11 – Keep Everything Minimal

The agent must follow these rules:

* prioritize structure over implementation
* create placeholders, not full features
* do not write detailed product UI
* do not seed real data
* do not build real cart behavior
* do not create complete checkout flow
* do not create full admin dashboard logic

This stage is only for **scaffolding the project**.

---

## 14. Expected Result

After finishing, the project should:

* have a clean root structure
* have frontend and backend separated
* have all main folders ready
* have minimal placeholder files ready
* be easy for a student team to continue developing

The result should be a **basic skeleton only**, not a finished application.

---

## 15. Final Instruction to Agent

Follow the steps in order.

1. Create folders first
2. Install basic dependencies
3. Create placeholder files
4. Configure routing skeleton
5. Configure server skeleton
6. Stop after the foundation is ready

Do not go beyond the basic setup stage.
