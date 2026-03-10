# Cấu Trúc Thư Mục Dự Án – Web Bán Cây Cảnh

Tài liệu này giải thích cấu trúc thư mục của dự án để các thành viên trong nhóm nắm rõ trước khi bắt đầu phát triển.

---

## Tổng Quan

Dự án được chia làm hai phần chính:

- **Frontend** – nằm trong thư mục gốc (`src/`), dùng React + Vite + TailwindCSS
- **Backend** – nằm trong thư mục `server/`, dùng Node.js + Express + MongoDB

---

## Cấu Trúc Thư Mục Gốc

```
WebBanCayCanh/
├── src/              # Mã nguồn frontend (React)
├── server/           # Mã nguồn backend (Node.js + Express)
├── public/           # Tài nguyên tĩnh (favicon, ảnh công khai)
├── docs/             # Tài liệu dự án
├── markdown/         # Hướng dẫn nội bộ cho nhóm
├── index.html        # HTML gốc của Vite
├── vite.config.js    # Cấu hình Vite
├── package.json      # Dependencies frontend
├── .gitignore        # Các file/thư mục không đưa lên Git
└── eslint.config.js  # Cấu hình ESLint
```

---

## Frontend – Thư Mục `src/`

```
src/
├── assets/               # Tài nguyên tĩnh của ứng dụng
│   ├── images/           # Hình ảnh (ảnh sản phẩm, banner, ...)
│   └── icons/            # Icon SVG hoặc PNG
│
├── components/           # Các component tái sử dụng
│   ├── common/           # Component dùng chung (Button, Input, Modal, ...)
│   ├── layout/           # Component bố cục trang
│   │   ├── Header.jsx    # Phần đầu trang (logo, thanh tìm kiếm, giỏ hàng)
│   │   ├── Footer.jsx    # Phần chân trang
│   │   └── Navbar.jsx    # Thanh điều hướng
│   └── product/          # Component liên quan đến sản phẩm (ProductCard, ...)
│
├── pages/                # Các trang chính của ứng dụng
│   ├── Home/
│   │   └── HomePage.jsx        # Trang chủ
│   ├── Products/
│   │   └── ProductsPage.jsx    # Trang danh sách sản phẩm
│   ├── Cart/
│   │   └── CartPage.jsx        # Trang giỏ hàng
│   ├── Checkout/
│   │   └── CheckoutPage.jsx    # Trang thanh toán
│   └── Admin/
│       └── AdminDashboard.jsx  # Trang quản trị
│
├── layouts/
│   └── MainLayout.jsx    # Layout chung (bọc Header + Outlet + Footer)
│
├── routes/
│   └── AppRoutes.jsx     # Khai báo tất cả các route của ứng dụng
│
├── context/
│   └── CartContext.jsx   # Quản lý state giỏ hàng toàn cục (React Context)
│
├── services/             # Giao tiếp với API backend
│   ├── productService.js # Hàm gọi API sản phẩm
│   └── orderService.js   # Hàm gọi API đơn hàng
│
├── utils/                # Hàm tiện ích dùng chung
│   └── formatCurrency.js # Định dạng tiền tệ sang VNĐ
│
├── App.jsx               # Component gốc, khởi tạo Router và Context
├── App.css               # CSS riêng của App
├── index.css             # CSS toàn cục (import TailwindCSS ở đây)
└── main.jsx              # Điểm vào của ứng dụng React
```

### Quy tắc khi làm việc với `src/`

- Mỗi trang nằm trong một thư mục riêng bên trong `pages/`
- Component dùng lại nhiều nơi thì đặt vào `components/common/`
- Logic gọi API chỉ được viết trong `services/`, không gọi API trực tiếp trong component
- State dùng chung nhiều component thì đặt vào `context/`
- CSS được viết bằng TailwindCSS trực tiếp trong JSX, hạn chế dùng CSS riêng

---

## Backend – Thư Mục `server/`

```
server/
├── config/
│   └── db.js                   # Kết nối MongoDB bằng Mongoose
│
├── models/                     # Định nghĩa cấu trúc dữ liệu (Schema)
│   ├── Product.js              # Schema sản phẩm
│   └── Order.js                # Schema đơn hàng
│
├── controllers/                # Xử lý logic nghiệp vụ
│   ├── productController.js    # Logic CRUD sản phẩm
│   └── orderController.js      # Logic xử lý đơn hàng
│
├── routes/                     # Định nghĩa các endpoint API
│   ├── productRoutes.js        # Route /api/products
│   └── orderRoutes.js          # Route /api/orders
│
├── middleware/                 # Middleware (xác thực, xử lý lỗi, ...)
│
├── .env                        # Biến môi trường (MONGO_URI, PORT) – không đưa lên Git
├── package.json                # Dependencies backend
└── server.js                   # File khởi động server Express
```

### Quy tắc khi làm việc với `server/`

- **Không** hardcode thông tin nhạy cảm (mật khẩu, URI) trong code, phải dùng `process.env`
- Mỗi loại dữ liệu có một file `model`, `controller`, và `routes` riêng
- Logic xử lý dữ liệu viết trong `controllers/`, không viết trực tiếp trong `routes/`
- Middleware dùng chung (ví dụ: xác thực token) đặt vào thư mục `middleware/`
- Chạy server bằng lệnh `npm run dev` (dùng nodemon để tự reload)

---

## Thư Mục `docs/`

Chứa tài liệu kỹ thuật cho toàn dự án:

| File                    | Nội dung                              |
|-------------------------|---------------------------------------|
| `PROJECT_STRUCTURE.md`  | Tóm tắt cấu trúc thư mục             |
| `TASK_ASSIGNMENT.md`    | Phân công công việc cho từng thành viên |
| `API_DOCUMENTATION.md`  | Danh sách các endpoint API            |

---

## Luồng Dữ Liệu

```
Người dùng
    │
    ▼
React (Frontend - src/)
    │  gọi API qua services/
    ▼
Express Server (Backend - server/)
    │  truy vấn qua models/
    ▼
MongoDB Atlas
```

---

## Cách Chạy Dự Án

### Chạy Frontend

```bash
# Tại thư mục gốc WebBanCayCanh/
npm install
npm run dev
```

Truy cập tại: `http://localhost:5173`

### Chạy Backend

```bash
# Tại thư mục server/
npm install
# Điền thông tin vào file .env trước
npm run dev
```

Server chạy tại: `http://localhost:5000`

---

## Lưu Ý Quan Trọng

- **Không được commit file `.env`** lên Git
- **Không được commit thư mục `node_modules`** lên Git
- Trước khi push code, kiểm tra lại bằng `npm run lint`
- Đặt tên file và component theo chuẩn **PascalCase** cho JSX, **camelCase** cho file JS thường
