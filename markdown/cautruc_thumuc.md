# Cấu Trúc Thư Mục Dự Án – Web Bán Cây Cảnh

Tài liệu này mô tả cấu trúc hiện tại của dự án.
Nguồn chuẩn chính thức: `docs/PROJECT_STRUCTURE.md`.

---

## Tổng Quan

Dự án được chia thành 2 phần chính:

- Frontend ở thư mục gốc, mã nguồn trong `src/` (React + Vite).
- Backend trong `server/` (Node.js + Express + MongoDB Atlas).

---

## Cấu Trúc Thư Mục Gốc

```txt
WebBanCayCanh/
├── src/                  # Mã nguồn frontend
├── server/               # Mã nguồn backend
├── database/             # Script seed + dữ liệu JSON
├── public/               # Static files cho frontend
├── docs/                 # Tài liệu chính thức
├── markdown/             # Ghi chú/hướng dẫn nội bộ
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Frontend – Thư Mục `src/`

```txt
src/
├── assets/
│   ├── icons/
│   └── images/
├── components/
│   ├── common/
│   ├── layout/
│   ├── product/          # Placeholder/legacy
│   └── products/         # Components sản phẩm đang dùng
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

### Ghi chú frontend

- Header đã tách thành nhiều component trong `src/components/layout/`:
  - `HeaderInfo.jsx`
  - `HeaderMain.jsx`
  - `HeaderShop.jsx`
  - `FullscreenMenu.jsx`
  - `LogoBlock.jsx`
- API call viết trong `src/services/`.
- Shared state viết trong `src/context/`.

---

## Backend – Thư Mục `server/`

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
├── .env                 # Local only, không commit
├── package.json
└── server.js
```

### Ghi chú backend

- Không hardcode thông tin nhạy cảm, dùng biến môi trường.
- Tách rõ model/controller/route theo từng domain.
- Luôn thêm route mới qua `server/server.js` theo prefix `/api/...`.

---

## Tài Liệu Liên Quan

- `docs/PROJECT_STRUCTURE.md`: tài liệu cấu trúc chuẩn, cập nhật theo code hiện tại.
- `docs/API_DOCUMENTATION.md`: mô tả endpoint API.
- `docs/TASK_ASSIGNMENT.md`: phân công công việc.

---

## Lưu Ý Quan Trọng

- Không commit file `.env`.
- Không commit thư mục `node_modules` và `dist`.
- Trước khi push, kiểm tra `npm run lint` ở frontend và backend.
