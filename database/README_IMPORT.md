# Bộ seed MongoDB Atlas — WebBanCayCanh

Thư mục `json/` chứa 10 file collection để import trực tiếp vào MongoDB Atlas.

## Danh sách file
- users.json
- categories.json
- products.json
- carts.json
- orders.json
- blog_posts.json
- stores.json
- reviews.json
- inventory_logs.json
- sales_stats.json

## Điểm đã cập nhật
- Các trường ảnh đã được thay bằng **link ảnh thật**.
- Những chỗ có URL ảnh trong bộ seed:
  - `products.images[].url`
  - `carts.items[].productImage`
  - `orders.items[].productImage`
  - `blog_posts.thumbnail`

## Import nhanh trên MongoDB Atlas
1. Tạo database: `WebBanCayCanh`
2. Tạo từng collection theo tên file
3. Chọn **Insert Document / Import Data**
4. Import từng file JSON tương ứng trong thư mục `json/`

## Import bằng mongosh
Chạy file:
```bash
mongosh "<your-mongodb-connection-string>" seed_mongosh.js
```

## Ghi chú
- File dùng định dạng **Extended JSON** để MongoDB nhận đúng `ObjectId` và `Date`.
- Các collection đã có tham chiếu chéo hợp lệ giữa `users`, `products`, `orders`, `reviews`, `carts`, `inventory_logs`.
