# Project Structure

This document is the single source of truth for the current repository structure.

## Overview

The project has two main runtime parts:

- Frontend at repository root, source in `src/` (React + Vite)
- Backend in `server/` (Node.js + Express + MongoDB)

## Root Structure

```txt
WebBanCayCanh/
├── src/                  # Frontend source
├── server/               # Backend source
├── database/             # Seed scripts and JSON datasets
├── public/               # Static assets served by Vite
├── docs/                 # Official project documentation
├── markdown/             # Internal notes and guides
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Frontend Structure (`src/`)

```txt
src/
├── assets/
│   ├── icons/
│   └── images/
├── components/
│   ├── common/
│   ├── layout/
│   ├── product/          # Reserved/legacy placeholder folder
│   └── products/         # Active product-related UI components
├── context/
├── layouts/
├── pages/
│   ├── About/
│   ├── Admin/
│   ├── Blog/
│   ├── Cart/
│   ├── Checkout/
│   ├── Home/
│   ├── Products/
│   └── Stores/
├── routes/
├── services/
├── utils/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

### Frontend Notes

- Header UI is split across multiple files in `components/layout/`:
  - `HeaderInfo.jsx`
  - `HeaderMain.jsx`
  - `HeaderShop.jsx`
  - `FullscreenMenu.jsx`
  - `LogoBlock.jsx`
- Keep API calls in `src/services/`.
- Keep cross-page state in `src/context/`.

## Backend Structure (`server/`)

```txt
server/
├── config/
│   └── db.js
├── controllers/
│   ├── blogController.js
│   ├── categoryController.js
│   ├── orderController.js
│   └── productController.js
├── middleware/
├── models/
│   ├── BlogPost.js
│   ├── Category.js
│   ├── Order.js
│   └── Product.js
├── routes/
│   ├── blogRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── .env                 # Local only, never commit
├── package.json
└── server.js
```

## Documentation Ownership

- `docs/PROJECT_STRUCTURE.md`: authoritative, actively maintained.
- `markdown/cautruc_thumuc.md`: Vietnamese structure explanation aligned with this file.
- `markdown/hiep/guide.md`: historical setup guide for initial skeleton stage.
