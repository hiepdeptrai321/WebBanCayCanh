# Cấu trúc các Collection — WebBanCayCanh

## 1. users

```js
{
  _id: "ObjectId",
  fullName: "Nguyễn Văn A",
  email: "a@gmail.com",
  passwordHash: "xxx",
  phone: "0909xxxxxx",
  role: "customer",         // "customer" | "admin"
  status: "active",         // "active" | "banned"
  addresses: [
    {
      _id: "ObjectId",
      recipientName: "Nguyễn Văn A",
      phone: "0909xxxxxx",
      province: "TP.HCM",
      district: "Gò Vấp",
      ward: "Phường 1",
      streetAddress: "12 Nguyễn Văn Bảo",
      isDefault: true
    }
  ],
  createdAt: "2026-03-10T00:00:00Z",
  updatedAt: "2026-03-10T00:00:00Z"
}
```

## 2. categories

```js
{
  _id: "ObjectId",
  name: "Cây để bàn",
  slug: "cay-de-ban",
  description: "Nhóm cây trang trí để bàn",
  parentId: null,
  isActive: true
}
```

## 3. products

```js
{
  _id: "ObjectId",
  categoryId: "ObjectId",
  name: "Cây kim tiền",
  slug: "cay-kim-tien",
  sku: "CKT001",
  shortDescription: "Cây phong thủy để bàn",
  description: "Cây phù hợp văn phòng, dễ chăm sóc",
  price: 250000,
  discountPrice: 220000,
  stockQuantity: 50,
  careInfo: {
    lightRequirement: "Ánh sáng gián tiếp",
    waterRequirement: "2 lần/tuần",
    humidityRequirement: "Trung bình",
    difficultyLevel: "Dễ"
  },
  dimensions: {
    heightCm: 35,
    potSizeCm: 15
  },
  images: [
    {
      url: "https://example.com/kimtien-1.jpg",
      alt: "Cây kim tiền",
      isPrimary: true
    },
    {
      url: "https://example.com/kimtien-2.jpg",
      alt: "Cây kim tiền góc nghiêng",
      isPrimary: false
    }
  ],
  attributes: [
    { name: "Màu lá", value: "Xanh" },
    { name: "Vị trí", value: "Trong nhà" }
  ],
  isFeatured: true,
  isActive: true,
  createdAt: "2026-03-10T00:00:00Z",
  updatedAt: "2026-03-10T00:00:00Z"
}
```

## 4. carts

```js
{
  _id: "ObjectId",
  userId: "ObjectId",
  status: "active",
  items: [
    {
      productId: "ObjectId",
      productName: "Cây kim tiền",
      productImage: "https://example.com/kimtien-1.jpg",
      unitPrice: 220000,
      quantity: 2,
      subtotal: 440000
    }
  ],
  updatedAt: "2026-03-10T00:00:00Z"
}
```

## 5. orders

```js
{
  _id: "ObjectId",
  orderCode: "ORD001",
  userId: "ObjectId",
  customerInfo: {
    fullName: "Nguyễn Văn A",
    phone: "0909xxxxxx",
    email: "a@gmail.com"
  },
  shippingAddress: {
    recipientName: "Nguyễn Văn A",
    phone: "0909xxxxxx",
    province: "TP.HCM",
    district: "Gò Vấp",
    ward: "Phường 1",
    streetAddress: "12 Nguyễn Văn Bảo"
  },
  items: [
    {
      productId: "ObjectId",
      productName: "Cây kim tiền",
      unitPrice: 220000,
      quantity: 2,
      subtotal: 440000
    }
  ],
  pricing: {
    subtotal: 440000,
    shippingFee: 30000,
    discountAmount: 0,
    totalAmount: 470000
  },
  payment: {
    method: "COD",              // "COD" | "bank_transfer" | "momo"
    status: "pending",          // "pending" | "paid" | "failed"
    transactionCode: null,
    paidAt: null
  },
  status: "pending_confirmation", // "pending_confirmation" | "confirmed" | "shipping" | "delivered" | "cancelled"
  note: "Giao giờ hành chính",
  orderedAt: "2026-03-10T00:00:00Z",
  updatedAt: "2026-03-10T00:00:00Z"
}
```

## 6. blog_posts

```js
{
  _id: "ObjectId",
  title: "Cách chăm sóc cây kim tiền",
  slug: "cach-cham-soc-cay-kim-tien",
  category: {
    id: "ObjectId",
    name: "Chăm sóc cây"
  },
  author: {
    id: "ObjectId",
    name: "Admin"
  },
  summary: "Hướng dẫn chăm sóc cây kim tiền đúng cách",
  content: "Nội dung bài viết...",
  thumbnail: "https://example.com/blog1.jpg",
  tags: ["chăm sóc cây", "kim tiền", "cây trong nhà"],
  viewCount: 120,
  isPublished: true,
  publishedAt: "2026-03-10T00:00:00Z"
}
```

## 7. stores

```js
{
  _id: "ObjectId",
  name: "Cửa hàng cây cảnh Hiệp",
  slug: "cua-hang-cay-canh-hiep",
  description: "Chuyên cây cảnh nội thất",
  branches: [
    {
      name: "Chi nhánh Gò Vấp",
      phone: "0909xxxxxx",
      province: "TP.HCM",
      district: "Gò Vấp",
      ward: "Phường 1",
      streetAddress: "12 Nguyễn Văn Bảo",
      openingHours: "08:00 - 21:00",
      mapUrl: "https://maps..."
    }
  ],
  isActive: true
}
```

## 8. reviews

```js
{
  _id: "ObjectId",
  productId: "ObjectId",
  user: {
    id: "ObjectId",
    fullName: "Nguyễn Văn A"
  },
  rating: 5,
  comment: "Cây đẹp, giao nhanh",
  isApproved: true,
  createdAt: "2026-03-10T00:00:00Z"
}
```

## 9. inventory_logs

```js
{
  _id: "ObjectId",
  productId: "ObjectId",
  adminId: "ObjectId",
  actionType: "import",       // "import" | "export" | "adjustment"
  quantityChanged: 20,
  quantityBefore: 30,
  quantityAfter: 50,
  note: "Nhập thêm hàng mới",
  createdAt: "2026-03-10T00:00:00Z"
}
```

## 10. sales_stats

```js
{
  _id: "ObjectId",
  statDate: "2026-03-10",
  totalOrders: 15,
  totalProductsSold: 42,
  revenue: 12500000
}
```

