Thêm nút Account / Đăng nhập ngay cạnh nút menu (hamburger) trong Header.
Hỗ trợ Đăng ký và Đăng nhập bằng Modal (popup) hiện đại, sang trọng.
Vẫn có route riêng /login và /register để SEO và bookmark.
Tài khoản người dùng được lưu vĩnh viễn trong MongoDB (không chỉ localStorage).

src/
├── components/
│ ├── auth/ # ← MỚI
│ │ ├── AccountButton.jsx -> Nút hiển thị ở Header (icon user). Chưa login → mở modal. Đã login → dropdown
│ │ ├── AuthModal.jsx
│ │ ├── LoginForm.jsx
│ │ └── RegisterForm.jsx
│ ├── layout/
│ │ └── HeaderShop.jsx -> thêm AccountButton
├── context/
│ └── AuthContext.jsx -> Quản lý trạng thái user toàn app (user, token, modal)
├── pages/
│ ├── Auth/
│ │ ├── Login.jsx
│ │ └── Register.jsx # ← MỚI
├── services/
│ └── authService.js # ← MỚI
└── main.jsx

server/
├── models/
│ └── User.js -> Collection MongoDB – Lưu tài khoản thật
├── controllers/
│ └── authController.js -> Xử lý logic đăng ký, đăng nhập, hash password
├── routes/
│ └── authRoutes.js # ← MỚI
├── .env
├── server.js # ← ĐÃ SỬA
└── package.json
