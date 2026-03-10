# Đặc tả CSDL MongoDB cho web bán cây cảnh

## 1. users

Lưu thông tin tài khoản người dùng và quản trị viên.

### Field

* `_id`: `ObjectId` — ID duy nhất của người dùng.
* `fullName`: `String` — Họ và tên.
* `email`: `String` — Email đăng nhập, nên unique.
* `passwordHash`: `String` — Mật khẩu đã mã hóa.
* `phone`: `String` — Số điện thoại.
* `role`: `String` — Vai trò, ví dụ: `customer`, `admin`.
* `status`: `String` — Trạng thái tài khoản, ví dụ: `active`, `inactive`, `blocked`.
* `addresses`: `Array<Object>` — Danh sách địa chỉ giao hàng được nhúng.

  * `_id`: `ObjectId` — ID địa chỉ.
  * `recipientName`: `String` — Tên người nhận.
  * `phone`: `String` — SĐT người nhận.
  * `province`: `String` — Tỉnh/thành.
  * `district`: `String` — Quận/huyện.
  * `ward`: `String` — Phường/xã.
  * `streetAddress`: `String` — Địa chỉ chi tiết.
  * `isDefault`: `Boolean` — Có phải địa chỉ mặc định không.
* `createdAt`: `Date` — Ngày tạo tài khoản.
* `updatedAt`: `Date` — Ngày cập nhật gần nhất.

---

## 2. categories

Lưu danh mục sản phẩm cây cảnh.

### Field

* `_id`: `ObjectId` — ID danh mục.
* `name`: `String` — Tên danh mục.
* `slug`: `String` — Chuỗi thân thiện URL.
* `description`: `String` — Mô tả danh mục.
* `parentId`: `ObjectId | null` — Danh mục cha nếu có.
* `isActive`: `Boolean` — Trạng thái hoạt động.

---

## 3. products

Lưu thông tin sản phẩm cây cảnh.

### Field

* `_id`: `ObjectId` — ID sản phẩm.
* `categoryId`: `ObjectId` — Tham chiếu đến `categories`.
* `name`: `String` — Tên sản phẩm.
* `slug`: `String` — Chuỗi URL.
* `sku`: `String` — Mã sản phẩm.
* `shortDescription`: `String` — Mô tả ngắn.
* `description`: `String` — Mô tả chi tiết.
* `price`: `Number` — Giá gốc.
* `discountPrice`: `Number` — Giá khuyến mãi.
* `stockQuantity`: `Number` — Số lượng tồn kho.
* `careInfo`: `Object` — Thông tin chăm sóc cây.

  * `lightRequirement`: `String` — Nhu cầu ánh sáng.
  * `waterRequirement`: `String` — Nhu cầu nước.
  * `humidityRequirement`: `String` — Nhu cầu độ ẩm.
  * `difficultyLevel`: `String` — Mức độ chăm sóc.
* `dimensions`: `Object` — Kích thước sản phẩm.

  * `heightCm`: `Number` — Chiều cao cây.
  * `potSizeCm`: `Number` — Kích thước chậu.
* `images`: `Array<Object>` — Danh sách ảnh sản phẩm.

  * `url`: `String` — Đường dẫn ảnh.
  * `alt`: `String` — Mô tả ảnh.
  * `isPrimary`: `Boolean` — Ảnh chính.
* `attributes`: `Array<Object>` — Thuộc tính bổ sung.

  * `name`: `String` — Tên thuộc tính.
  * `value`: `String` — Giá trị thuộc tính.
* `isFeatured`: `Boolean` — Có hiển thị nổi bật ở trang chủ không.
* `isActive`: `Boolean` — Trạng thái kinh doanh.
* `createdAt`: `Date` — Ngày tạo.
* `updatedAt`: `Date` — Ngày cập nhật.

---

## 4. carts

Lưu giỏ hàng hiện tại của người dùng.

### Field

* `_id`: `ObjectId` — ID giỏ hàng.
* `userId`: `ObjectId` — Tham chiếu đến `users`.
* `status`: `String` — Trạng thái, ví dụ: `active`, `checked_out`.
* `items`: `Array<Object>` — Danh sách sản phẩm trong giỏ.

  * `productId`: `ObjectId` — ID sản phẩm.
  * `productName`: `String` — Tên sản phẩm tại thời điểm thêm giỏ.
  * `productImage`: `String` — Ảnh đại diện.
  * `unitPrice`: `Number` — Giá tại thời điểm thêm giỏ.
  * `quantity`: `Number` — Số lượng.
  * `subtotal`: `Number` — Thành tiền dòng hàng.
* `updatedAt`: `Date` — Thời gian cập nhật giỏ hàng.

---

## 5. orders

Lưu đơn hàng đã đặt.

### Field

* `_id`: `ObjectId` — ID đơn hàng.
* `orderCode`: `String` — Mã đơn hàng.
* `userId`: `ObjectId` — Tham chiếu người đặt.
* `customerInfo`: `Object` — Thông tin khách hàng tại thời điểm đặt.

  * `fullName`: `String` — Họ tên.
  * `phone`: `String` — Số điện thoại.
  * `email`: `String` — Email.
* `shippingAddress`: `Object` — Địa chỉ giao hàng snapshot.

  * `recipientName`: `String`
  * `phone`: `String`
  * `province`: `String`
  * `district`: `String`
  * `ward`: `String`
  * `streetAddress`: `String`
* `items`: `Array<Object>` — Danh sách sản phẩm trong đơn.

  * `productId`: `ObjectId` — ID sản phẩm.
  * `productName`: `String` — Tên sản phẩm tại thời điểm mua.
  * `productImage`: `String` — Ảnh tại thời điểm mua.
  * `unitPrice`: `Number` — Giá mua.
  * `quantity`: `Number` — Số lượng.
  * `subtotal`: `Number` — Thành tiền từng dòng.
* `pricing`: `Object` — Thông tin tiền.

  * `subtotal`: `Number` — Tạm tính.
  * `shippingFee`: `Number` — Phí giao hàng.
  * `discountAmount`: `Number` — Số tiền giảm.
  * `totalAmount`: `Number` — Tổng thanh toán.
* `payment`: `Object` — Thông tin thanh toán.

  * `method`: `String` — Ví dụ: `COD`, `BANKING`, `MOMO`.
  * `status`: `String` — Ví dụ: `pending`, `paid`, `failed`.
  * `transactionCode`: `String | null` — Mã giao dịch.
  * `paidAt`: `Date | null` — Thời điểm thanh toán.
* `status`: `String` — Trạng thái đơn hàng, ví dụ: `pending_confirmation`, `confirmed`, `shipping`, `completed`, `cancelled`.
* `note`: `String` — Ghi chú đơn hàng.
* `orderedAt`: `Date` — Ngày đặt hàng.
* `updatedAt`: `Date` — Ngày cập nhật.

---

## 6. blog_posts

Lưu bài viết kiến thức cây cảnh.

### Field

* `_id`: `ObjectId` — ID bài viết.
* `title`: `String` — Tiêu đề bài viết.
* `slug`: `String` — Chuỗi URL thân thiện.
* `category`: `Object` — Thông tin danh mục bài viết.

  * `id`: `ObjectId` — ID danh mục.
  * `name`: `String` — Tên danh mục.
* `author`: `Object` — Thông tin tác giả.

  * `id`: `ObjectId` — ID tác giả.
  * `name`: `String` — Tên tác giả.
* `summary`: `String` — Tóm tắt bài viết.
* `content`: `String` — Nội dung chi tiết.
* `thumbnail`: `String` — Ảnh đại diện bài viết.
* `tags`: `Array<String>` — Từ khóa liên quan.
* `viewCount`: `Number` — Số lượt xem.
* `isPublished`: `Boolean` — Trạng thái xuất bản.
* `publishedAt`: `Date` — Ngày đăng bài.

---

## 7. stores

Lưu thông tin cửa hàng và chi nhánh.

### Field

* `_id`: `ObjectId` — ID cửa hàng.
* `name`: `String` — Tên cửa hàng.
* `slug`: `String` — Chuỗi URL.
* `description`: `String` — Mô tả chung.
* `branches`: `Array<Object>` — Danh sách chi nhánh.

  * `name`: `String` — Tên chi nhánh.
  * `phone`: `String` — Số điện thoại.
  * `province`: `String` — Tỉnh/thành.
  * `district`: `String` — Quận/huyện.
  * `ward`: `String` — Phường/xã.
  * `streetAddress`: `String` — Địa chỉ cụ thể.
  * `openingHours`: `String` — Giờ mở cửa.
  * `mapUrl`: `String` — Link bản đồ.
* `isActive`: `Boolean` — Trạng thái hoạt động.

---

## 8. reviews

Lưu đánh giá sản phẩm.

### Field

* `_id`: `ObjectId` — ID đánh giá.
* `productId`: `ObjectId` — Tham chiếu đến `products`.
* `user`: `Object` — Thông tin người đánh giá.

  * `id`: `ObjectId` — ID người dùng.
  * `fullName`: `String` — Tên hiển thị.
* `rating`: `Number` — Điểm đánh giá, ví dụ từ 1 đến 5.
* `comment`: `String` — Nội dung nhận xét.
* `isApproved`: `Boolean` — Đã được duyệt hiển thị hay chưa.
* `createdAt`: `Date` — Thời điểm tạo đánh giá.

---

## 9. inventory_logs

Lưu lịch sử thay đổi tồn kho để phục vụ quản trị.

### Field

* `_id`: `ObjectId` — ID log.
* `productId`: `ObjectId` — ID sản phẩm.
* `adminId`: `ObjectId` — ID quản trị viên thao tác.
* `actionType`: `String` — Loại thao tác, ví dụ: `import`, `export`, `adjust`.
* `quantityChanged`: `Number` — Số lượng thay đổi.
* `quantityBefore`: `Number` — Tồn kho trước thay đổi.
* `quantityAfter`: `Number` — Tồn kho sau thay đổi.
* `note`: `String` — Ghi chú.
* `createdAt`: `Date` — Thời điểm thao tác.

---

## 10. sales_stats

Lưu số liệu thống kê theo ngày.

### Field

* `_id`: `ObjectId` — ID bản ghi thống kê.
* `statDate`: `String | Date` — Ngày thống kê.
* `totalOrders`: `Number` — Tổng số đơn hàng.
* `totalProductsSold`: `Number` — Tổng số sản phẩm đã bán.
* `revenue`: `Number` — Doanh thu.

---

## Ghi chú thiết kế

* Các collection như `users`, `products`, `orders`, `blog_posts` là collection chính.
* Các dữ liệu đi cùng nhau thường xuyên như `addresses`, `images`, `attributes`, `items`, `branches` được thiết kế theo kiểu **embedded document**.
* Các dữ liệu cần truy vấn độc lập hoặc tăng trưởng lớn như `products`, `orders`, `reviews`, `inventory_logs` được tách thành collection riêng.
* Với các field tham chiếu như `userId`, `productId`, `categoryId`, hệ thống dùng `ObjectId` để liên kết logic giữa các collection.
