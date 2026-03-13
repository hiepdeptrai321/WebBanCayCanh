use('WebBanCayCanh');

db.users.deleteMany({});
db.users.insertMany([
  {
    "_id": {
      "$oid": "65f000000000000000000001"
    },
    "fullName": "Quản trị viên Hiệp Garden",
    "email": "admin@hiepgarden.vn",
    "passwordHash": "$2b$10$adminseedhashxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "phone": "0909000001",
    "role": "admin",
    "status": "active",
    "addresses": [],
    "createdAt": {
      "$date": "2026-03-10T08:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T03:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f000000000000000000002"
    },
    "fullName": "Nguyễn Minh Anh",
    "email": "minhanh@gmail.com",
    "passwordHash": "$2b$10$customerseedhashxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "phone": "0909123456",
    "role": "customer",
    "status": "active",
    "addresses": [
      {
        "_id": {
          "$oid": "65f100000000000000000001"
        },
        "recipientName": "Nguyễn Minh Anh",
        "phone": "0909123456",
        "province": "TP.HCM",
        "district": "Gò Vấp",
        "ward": "Phường 3",
        "streetAddress": "120 Nguyễn Văn Bảo",
        "isDefault": true
      }
    ],
    "createdAt": {
      "$date": "2026-03-10T09:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T04:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f000000000000000000003"
    },
    "fullName": "Trần Thu Hà",
    "email": "thuha@gmail.com",
    "passwordHash": "$2b$10$customerseedhashyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    "phone": "0911222333",
    "role": "customer",
    "status": "active",
    "addresses": [
      {
        "_id": {
          "$oid": "65f100000000000000000002"
        },
        "recipientName": "Trần Thu Hà",
        "phone": "0911222333",
        "province": "TP.HCM",
        "district": "Bình Thạnh",
        "ward": "Phường 25",
        "streetAddress": "45 D5",
        "isDefault": true
      }
    ],
    "createdAt": {
      "$date": "2026-03-10T10:30:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T05:30:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f000000000000000000004"
    },
    "fullName": "Lê Hoàng Nam",
    "email": "hoangnam@gmail.com",
    "passwordHash": "$2b$10$customerseedhashzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    "phone": "0933444555",
    "role": "customer",
    "status": "active",
    "addresses": [
      {
        "_id": {
          "$oid": "65f100000000000000000003"
        },
        "recipientName": "Lê Hoàng Nam",
        "phone": "0933444555",
        "province": "TP.HCM",
        "district": "Thủ Đức",
        "ward": "Linh Trung",
        "streetAddress": "15 Võ Văn Ngân",
        "isDefault": true
      }
    ],
    "createdAt": {
      "$date": "2026-03-11T01:10:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T01:00:00Z"
    }
  }
]);

db.categories.deleteMany({});
db.categories.insertMany([
  {
    "_id": {
      "$oid": "65f200000000000000000001"
    },
    "name": "Cây để bàn",
    "slug": "cay-de-ban",
    "description": "Nhóm cây nhỏ gọn phù hợp bàn làm việc và kệ trang trí.",
    "parentId": null,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "65f200000000000000000002"
    },
    "name": "Cây nội thất",
    "slug": "cay-noi-that",
    "description": "Các loại cây xanh phù hợp trang trí không gian trong nhà.",
    "parentId": null,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "65f200000000000000000003"
    },
    "name": "Sen đá & xương rồng",
    "slug": "sen-da-xuong-rong",
    "description": "Nhóm cây chịu hạn, dễ chăm sóc, kích thước nhỏ.",
    "parentId": null,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "65f200000000000000000004"
    },
    "name": "Cây cỡ lớn",
    "slug": "cay-co-lon",
    "description": "Cây nổi bật cho phòng khách, sảnh, văn phòng.",
    "parentId": null,
    "isActive": true
  },
  {
    "_id": {
      "$oid": "65f200000000000000000005"
    },
    "name": "Cây dây leo",
    "slug": "cay-day-leo",
    "description": "Các loại cây rủ, dây leo, phù hợp kệ cao và ban công.",
    "parentId": null,
    "isActive": true
  }
]);

db.products.deleteMany({});
db.products.insertMany([
  {
    "_id": {
      "$oid": "65f300000000000000000001"
    },
    "categoryId": {
      "$oid": "65f200000000000000000002"
    },
    "name": "Cây kim tiền",
    "slug": "cay-kim-tien",
    "sku": "SP001",
    "shortDescription": "Cây phong thủy dễ chăm, phù hợp văn phòng.",
    "description": "Kim tiền có tán lá dày, xanh bóng, tượng trưng cho tài lộc và rất phù hợp để đặt ở phòng khách hoặc bàn làm việc.",
    "price": 320000,
    "discountPrice": 285000,
    "stockQuantity": 34,
    "careInfo": {
      "lightRequirement": "Ánh sáng gián tiếp",
      "waterRequirement": "1-2 lần/tuần",
      "humidityRequirement": "Trung bình",
      "difficultyLevel": "Dễ"
    },
    "dimensions": {
      "heightCm": 45,
      "potSizeCm": 18
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Cây kim tiền",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1570641798336-7696b1de5827?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Cây kim tiền - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Màu lá",
        "value": "Xanh đậm"
      },
      {
        "name": "Vị trí",
        "value": "Trong nhà"
      }
    ],
    "isFeatured": true,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000002"
    },
    "categoryId": {
      "$oid": "65f200000000000000000001"
    },
    "name": "Cây lưỡi hổ mini",
    "slug": "cay-luoi-ho-mini",
    "sku": "SP002",
    "shortDescription": "Cây thanh lọc không khí, hợp góc học tập.",
    "description": "Lưỡi hổ mini có dáng đứng khỏe, dễ sống, chịu hạn tốt và phù hợp với người bận rộn.",
    "price": 190000,
    "discountPrice": 165000,
    "stockQuantity": 52,
    "careInfo": {
      "lightRequirement": "Ánh sáng nhẹ hoặc gián tiếp",
      "waterRequirement": "5-7 ngày/lần",
      "humidityRequirement": "Thấp",
      "difficultyLevel": "Dễ"
    },
    "dimensions": {
      "heightCm": 30,
      "potSizeCm": 14
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1547306720-ad507f7d4d7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Cây lưỡi hổ mini",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Cây lưỡi hổ mini - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Màu lá",
        "value": "Xanh viền vàng"
      },
      {
        "name": "Vị trí",
        "value": "Trong nhà"
      }
    ],
    "isFeatured": true,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000003"
    },
    "categoryId": {
      "$oid": "65f200000000000000000005"
    },
    "name": "Trầu bà xanh",
    "slug": "trau-ba-xanh",
    "sku": "SP003",
    "shortDescription": "Cây dây leo mềm mại, phù hợp kệ cao và ban công.",
    "description": "Trầu bà xanh sinh trưởng nhanh, lá bóng đẹp, dễ chăm và tạo cảm giác tươi mát cho không gian sống.",
    "price": 210000,
    "discountPrice": 185000,
    "stockQuantity": 41,
    "careInfo": {
      "lightRequirement": "Ánh sáng gián tiếp",
      "waterRequirement": "2-3 lần/tuần",
      "humidityRequirement": "Trung bình",
      "difficultyLevel": "Dễ"
    },
    "dimensions": {
      "heightCm": 35,
      "potSizeCm": 16
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1624798762133-9fbf8f209b7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Trầu bà xanh",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1747156198758-e12dfd4fe7ee?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Trầu bà xanh - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Dáng cây",
        "value": "Dây leo"
      },
      {
        "name": "Vị trí",
        "value": "Trong nhà/Ban công"
      }
    ],
    "isFeatured": false,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000004"
    },
    "categoryId": {
      "$oid": "65f200000000000000000004"
    },
    "name": "Monstera deliciosa",
    "slug": "monstera-deliciosa",
    "sku": "SP004",
    "shortDescription": "Cây lá xẻ nổi bật, hợp không gian hiện đại.",
    "description": "Monstera là dòng cây nội thất được ưa chuộng nhờ bộ lá xẻ lớn, tạo điểm nhấn mạnh cho phòng khách hoặc studio.",
    "price": 690000,
    "discountPrice": 620000,
    "stockQuantity": 18,
    "careInfo": {
      "lightRequirement": "Ánh sáng tán xạ mạnh",
      "waterRequirement": "2 lần/tuần",
      "humidityRequirement": "Trung bình",
      "difficultyLevel": "Trung bình"
    },
    "dimensions": {
      "heightCm": 75,
      "potSizeCm": 24
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1762755647813-017e128a4ba0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Monstera deliciosa",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1623325943583-d658515e0889?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Monstera deliciosa - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Kiểu lá",
        "value": "Lá xẻ"
      },
      {
        "name": "Vị trí",
        "value": "Phòng khách"
      }
    ],
    "isFeatured": true,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000005"
    },
    "categoryId": {
      "$oid": "65f200000000000000000003"
    },
    "name": "Sen đá mix chậu sứ",
    "slug": "sen-da-mix-chau-su",
    "sku": "SP005",
    "shortDescription": "Bộ sen đá nhỏ gọn, tối giản, hợp bàn làm việc.",
    "description": "Sen đá mix chậu sứ có vẻ ngoài thanh lịch, chịu hạn tốt, ít phải chăm và là lựa chọn quà tặng phổ biến.",
    "price": 145000,
    "discountPrice": 129000,
    "stockQuantity": 67,
    "careInfo": {
      "lightRequirement": "Nơi sáng, có nắng nhẹ",
      "waterRequirement": "5-7 ngày/lần",
      "humidityRequirement": "Thấp",
      "difficultyLevel": "Dễ"
    },
    "dimensions": {
      "heightCm": 16,
      "potSizeCm": 10
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1498251095152-27c0ddd22aae?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Sen đá mix chậu sứ",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1669144457395-0ea4b03edaac?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Sen đá mix chậu sứ - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Nhóm cây",
        "value": "Sen đá"
      },
      {
        "name": "Vị trí",
        "value": "Bàn làm việc"
      }
    ],
    "isFeatured": false,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000006"
    },
    "categoryId": {
      "$oid": "65f200000000000000000003"
    },
    "name": "Nha đam mini",
    "slug": "nha-dam-mini",
    "sku": "SP006",
    "shortDescription": "Cây nhỏ xinh, dễ sống, hợp cửa sổ và bếp.",
    "description": "Nha đam mini có phần lá mọng nước, dễ chăm, chịu nắng tốt và thích hợp đặt gần cửa sổ hoặc ban công nhỏ.",
    "price": 125000,
    "discountPrice": 110000,
    "stockQuantity": 39,
    "careInfo": {
      "lightRequirement": "Có nắng nhẹ buổi sáng",
      "waterRequirement": "4-6 ngày/lần",
      "humidityRequirement": "Thấp",
      "difficultyLevel": "Dễ"
    },
    "dimensions": {
      "heightCm": 22,
      "potSizeCm": 11
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1547516508-c0b73071d9de?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Nha đam mini",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1501297948169-8123996e0b80?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Nha đam mini - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Nhóm cây",
        "value": "Mọng nước"
      },
      {
        "name": "Vị trí",
        "value": "Cửa sổ/Ban công"
      }
    ],
    "isFeatured": false,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000007"
    },
    "categoryId": {
      "$oid": "65f200000000000000000005"
    },
    "name": "Trầu bà cẩm thạch",
    "slug": "trau-ba-cam-thach",
    "sku": "SP007",
    "shortDescription": "Phiên bản trầu bà lá variegated nổi bật.",
    "description": "Trầu bà cẩm thạch có màu lá loang sáng đẹp mắt, phù hợp decor phong cách hiện đại và tối giản.",
    "price": 260000,
    "discountPrice": 235000,
    "stockQuantity": 22,
    "careInfo": {
      "lightRequirement": "Ánh sáng gián tiếp sáng",
      "waterRequirement": "2-3 lần/tuần",
      "humidityRequirement": "Trung bình",
      "difficultyLevel": "Trung bình"
    },
    "dimensions": {
      "heightCm": 30,
      "potSizeCm": 15
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1623325943583-d658515e0889?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Trầu bà cẩm thạch",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1624798762133-9fbf8f209b7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Trầu bà cẩm thạch - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Màu lá",
        "value": "Xanh trắng"
      },
      {
        "name": "Vị trí",
        "value": "Trong nhà"
      }
    ],
    "isFeatured": true,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f300000000000000000008"
    },
    "categoryId": {
      "$oid": "65f200000000000000000001"
    },
    "name": "Lan ý để bàn",
    "slug": "lan-y-de-ban",
    "sku": "SP008",
    "shortDescription": "Cây lá xanh bóng, mang vẻ dịu mắt và thanh lịch.",
    "description": "Lan ý phù hợp đặt ở bàn làm việc hoặc kệ sách, tạo cảm giác nhẹ nhàng và giúp không gian thêm mát mắt.",
    "price": 280000,
    "discountPrice": 249000,
    "stockQuantity": 27,
    "careInfo": {
      "lightRequirement": "Ánh sáng gián tiếp",
      "waterRequirement": "2 lần/tuần",
      "humidityRequirement": "Cao",
      "difficultyLevel": "Trung bình"
    },
    "dimensions": {
      "heightCm": 38,
      "potSizeCm": 16
    },
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1620310252507-c65943dbd411?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Lan ý để bàn",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1744744041806-e70b5fe91a56?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "alt": "Lan ý để bàn - góc chụp khác",
        "isPrimary": false
      }
    ],
    "attributes": [
      {
        "name": "Đặc điểm",
        "value": "Lá bóng xanh"
      },
      {
        "name": "Vị trí",
        "value": "Trong nhà"
      }
    ],
    "isFeatured": false,
    "isActive": true,
    "createdAt": {
      "$date": "2026-03-10T00:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T00:00:00Z"
    }
  }
]);

db.carts.deleteMany({});
db.carts.insertMany([
  {
    "_id": {
      "$oid": "65f400000000000000000001"
    },
    "userId": {
      "$oid": "65f000000000000000000002"
    },
    "status": "active",
    "items": [
      {
        "productId": {
          "$oid": "65f300000000000000000001"
        },
        "productName": "Cây kim tiền",
        "productImage": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 285000,
        "quantity": 1,
        "subtotal": 285000
      },
      {
        "productId": {
          "$oid": "65f300000000000000000005"
        },
        "productName": "Sen đá mix chậu sứ",
        "productImage": "https://images.unsplash.com/photo-1498251095152-27c0ddd22aae?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 129000,
        "quantity": 2,
        "subtotal": 258000
      }
    ],
    "updatedAt": {
      "$date": "2026-03-12T07:15:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f400000000000000000002"
    },
    "userId": {
      "$oid": "65f000000000000000000003"
    },
    "status": "active",
    "items": [
      {
        "productId": {
          "$oid": "65f300000000000000000003"
        },
        "productName": "Trầu bà xanh",
        "productImage": "https://images.unsplash.com/photo-1624798762133-9fbf8f209b7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 185000,
        "quantity": 1,
        "subtotal": 185000
      },
      {
        "productId": {
          "$oid": "65f300000000000000000002"
        },
        "productName": "Cây lưỡi hổ mini",
        "productImage": "https://images.unsplash.com/photo-1547306720-ad507f7d4d7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 165000,
        "quantity": 1,
        "subtotal": 165000
      }
    ],
    "updatedAt": {
      "$date": "2026-03-12T08:05:00Z"
    }
  }
]);

db.orders.deleteMany({});
db.orders.insertMany([
  {
    "_id": {
      "$oid": "65f500000000000000000001"
    },
    "orderCode": "ORD001",
    "userId": {
      "$oid": "65f000000000000000000002"
    },
    "customerInfo": {
      "fullName": "Nguyễn Minh Anh",
      "phone": "0909123456",
      "email": "minhanh@gmail.com"
    },
    "shippingAddress": {
      "recipientName": "Nguyễn Minh Anh",
      "phone": "0909123456",
      "province": "TP.HCM",
      "district": "Gò Vấp",
      "ward": "Phường 3",
      "streetAddress": "120 Nguyễn Văn Bảo"
    },
    "items": [
      {
        "productId": {
          "$oid": "65f300000000000000000001"
        },
        "productName": "Cây kim tiền",
        "productImage": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 285000,
        "quantity": 1,
        "subtotal": 285000
      },
      {
        "productId": {
          "$oid": "65f300000000000000000005"
        },
        "productName": "Sen đá mix chậu sứ",
        "productImage": "https://images.unsplash.com/photo-1498251095152-27c0ddd22aae?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 129000,
        "quantity": 2,
        "subtotal": 258000
      }
    ],
    "pricing": {
      "subtotal": 543000,
      "shippingFee": 30000,
      "discountAmount": 0,
      "totalAmount": 573000
    },
    "payment": {
      "method": "COD",
      "status": "pending",
      "transactionCode": null,
      "paidAt": null
    },
    "status": "pending_confirmation",
    "note": "Giao giờ hành chính",
    "orderedAt": {
      "$date": "2026-03-12T02:30:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T09:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f500000000000000000002"
    },
    "orderCode": "ORD002",
    "userId": {
      "$oid": "65f000000000000000000003"
    },
    "customerInfo": {
      "fullName": "Trần Thu Hà",
      "phone": "0911222333",
      "email": "thuha@gmail.com"
    },
    "shippingAddress": {
      "recipientName": "Trần Thu Hà",
      "phone": "0911222333",
      "province": "TP.HCM",
      "district": "Bình Thạnh",
      "ward": "Phường 25",
      "streetAddress": "45 D5"
    },
    "items": [
      {
        "productId": {
          "$oid": "65f300000000000000000003"
        },
        "productName": "Trầu bà xanh",
        "productImage": "https://images.unsplash.com/photo-1624798762133-9fbf8f209b7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 185000,
        "quantity": 1,
        "subtotal": 185000
      },
      {
        "productId": {
          "$oid": "65f300000000000000000002"
        },
        "productName": "Cây lưỡi hổ mini",
        "productImage": "https://images.unsplash.com/photo-1547306720-ad507f7d4d7b?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 165000,
        "quantity": 1,
        "subtotal": 165000
      }
    ],
    "pricing": {
      "subtotal": 350000,
      "shippingFee": 30000,
      "discountAmount": 0,
      "totalAmount": 380000
    },
    "payment": {
      "method": "MOMO",
      "status": "paid",
      "transactionCode": "MOMO20260311001",
      "paidAt": {
        "$date": "2026-03-11T08:22:00Z"
      }
    },
    "status": "confirmed",
    "note": "Gọi trước khi giao",
    "orderedAt": {
      "$date": "2026-03-11T08:20:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T09:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f500000000000000000003"
    },
    "orderCode": "ORD003",
    "userId": {
      "$oid": "65f000000000000000000004"
    },
    "customerInfo": {
      "fullName": "Lê Hoàng Nam",
      "phone": "0933444555",
      "email": "hoangnam@gmail.com"
    },
    "shippingAddress": {
      "recipientName": "Lê Hoàng Nam",
      "phone": "0933444555",
      "province": "TP.HCM",
      "district": "Thủ Đức",
      "ward": "Linh Trung",
      "streetAddress": "15 Võ Văn Ngân"
    },
    "items": [
      {
        "productId": {
          "$oid": "65f300000000000000000004"
        },
        "productName": "Monstera deliciosa",
        "productImage": "https://images.unsplash.com/photo-1762755647813-017e128a4ba0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 620000,
        "quantity": 1,
        "subtotal": 620000
      },
      {
        "productId": {
          "$oid": "65f300000000000000000006"
        },
        "productName": "Nha đam mini",
        "productImage": "https://images.unsplash.com/photo-1547516508-c0b73071d9de?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
        "unitPrice": 110000,
        "quantity": 1,
        "subtotal": 110000
      }
    ],
    "pricing": {
      "subtotal": 730000,
      "shippingFee": 30000,
      "discountAmount": 0,
      "totalAmount": 760000
    },
    "payment": {
      "method": "bank_transfer",
      "status": "paid",
      "transactionCode": "BANK20260311003",
      "paidAt": {
        "$date": "2026-03-11T01:10:00Z"
      }
    },
    "status": "shipping",
    "note": "Giao buổi tối",
    "orderedAt": {
      "$date": "2026-03-11T01:00:00Z"
    },
    "updatedAt": {
      "$date": "2026-03-12T09:00:00Z"
    }
  }
]);

db.blog_posts.deleteMany({});
db.blog_posts.insertMany([
  {
    "_id": {
      "$oid": "65f600000000000000000001"
    },
    "title": "Cách chăm sóc cây kim tiền trong môi trường văn phòng",
    "slug": "cach-cham-soc-cay-kim-tien-van-phong",
    "category": {
      "id": {
        "$oid": "65f200000000000000000002"
      },
      "name": "Cây nội thất"
    },
    "author": {
      "id": {
        "$oid": "65f000000000000000000001"
      },
      "name": "Quản trị viên Hiệp Garden"
    },
    "summary": "Một số lưu ý về ánh sáng, nước và vị trí đặt cây kim tiền để cây luôn khỏe đẹp.",
    "content": "Cây kim tiền phù hợp môi trường trong nhà, nên đặt ở nơi có ánh sáng gián tiếp và tránh tưới quá nhiều. Khi mặt đất khô mới tưới lại để hạn chế úng rễ.",
    "thumbnail": "https://images.unsplash.com/photo-1570641798336-7696b1de5827?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "tags": [
      "chăm sóc cây",
      "kim tiền",
      "cây nội thất"
    ],
    "viewCount": 220,
    "isPublished": true,
    "publishedAt": {
      "$date": "2026-03-10T02:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f600000000000000000002"
    },
    "title": "5 vị trí đẹp để đặt monstera trong phòng khách",
    "slug": "5-vi-tri-dep-dat-monstera-trong-phong-khach",
    "category": {
      "id": {
        "$oid": "65f200000000000000000004"
      },
      "name": "Cây cỡ lớn"
    },
    "author": {
      "id": {
        "$oid": "65f000000000000000000001"
      },
      "name": "Quản trị viên Hiệp Garden"
    },
    "summary": "Gợi ý bố trí monstera giúp không gian hiện đại hơn mà vẫn đảm bảo cây phát triển tốt.",
    "content": "Monstera hợp với góc có ánh sáng tán xạ, cạnh sofa, gần cửa kính hoặc các vị trí tạo điểm nhấn trong không gian mở. Tránh nắng gắt trực tiếp giữa trưa.",
    "thumbnail": "https://images.unsplash.com/photo-1762755647813-017e128a4ba0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "tags": [
      "monstera",
      "decor",
      "phòng khách"
    ],
    "viewCount": 176,
    "isPublished": true,
    "publishedAt": {
      "$date": "2026-03-11T01:30:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f600000000000000000003"
    },
    "title": "Tưới nước cho sen đá và nha đam như thế nào cho đúng?",
    "slug": "tuoi-nuoc-cho-sen-da-va-nha-dam-dung-cach",
    "category": {
      "id": {
        "$oid": "65f200000000000000000003"
      },
      "name": "Sen đá & xương rồng"
    },
    "author": {
      "id": {
        "$oid": "65f000000000000000000001"
      },
      "name": "Quản trị viên Hiệp Garden"
    },
    "summary": "Phân biệt tần suất tưới của các dòng cây mọng nước để tránh thối rễ.",
    "content": "Sen đá và nha đam đều chịu hạn tốt nên không cần tưới thường xuyên. Chỉ nên tưới khi giá thể khô, ưu tiên chậu thoát nước tốt và nơi có ánh sáng ổn định.",
    "thumbnail": "https://images.unsplash.com/photo-1498251095152-27c0ddd22aae?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    "tags": [
      "sen đá",
      "nha đam",
      "tưới nước"
    ],
    "viewCount": 143,
    "isPublished": true,
    "publishedAt": {
      "$date": "2026-03-11T09:15:00Z"
    }
  }
]);

db.stores.deleteMany({});
db.stores.insertMany([
  {
    "_id": {
      "$oid": "65f700000000000000000001"
    },
    "name": "Cửa hàng cây cảnh Hiệp Garden",
    "slug": "cua-hang-cay-canh-hiep-garden",
    "description": "Chuyên cây cảnh nội thất, cây để bàn và phụ kiện trang trí không gian sống.",
    "branches": [
      {
        "name": "Chi nhánh Gò Vấp",
        "phone": "0909001122",
        "province": "TP.HCM",
        "district": "Gò Vấp",
        "ward": "Phường 3",
        "streetAddress": "120 Nguyễn Văn Bảo",
        "openingHours": "08:00 - 21:00",
        "mapUrl": "https://maps.google.com/?q=120+Nguyen+Van+Bao+Go+Vap+HCM"
      },
      {
        "name": "Chi nhánh Thủ Đức",
        "phone": "0909003344",
        "province": "TP.HCM",
        "district": "Thủ Đức",
        "ward": "Linh Trung",
        "streetAddress": "15 Võ Văn Ngân",
        "openingHours": "08:00 - 21:30",
        "mapUrl": "https://maps.google.com/?q=15+Vo+Van+Ngan+Thu+Duc+HCM"
      }
    ],
    "isActive": true
  }
]);

db.reviews.deleteMany({});
db.reviews.insertMany([
  {
    "_id": {
      "$oid": "65f800000000000000000001"
    },
    "productId": {
      "$oid": "65f300000000000000000001"
    },
    "user": {
      "id": {
        "$oid": "65f000000000000000000002"
      },
      "fullName": "Nguyễn Minh Anh"
    },
    "rating": 5,
    "comment": "Cây đẹp, lá bóng và đóng gói rất kỹ.",
    "isApproved": true,
    "createdAt": {
      "$date": "2026-03-12T04:20:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f800000000000000000002"
    },
    "productId": {
      "$oid": "65f300000000000000000002"
    },
    "user": {
      "id": {
        "$oid": "65f000000000000000000003"
      },
      "fullName": "Trần Thu Hà"
    },
    "rating": 4,
    "comment": "Form cây gọn, hợp bàn làm việc, giao nhanh.",
    "isApproved": true,
    "createdAt": {
      "$date": "2026-03-11T10:20:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f800000000000000000003"
    },
    "productId": {
      "$oid": "65f300000000000000000004"
    },
    "user": {
      "id": {
        "$oid": "65f000000000000000000004"
      },
      "fullName": "Lê Hoàng Nam"
    },
    "rating": 5,
    "comment": "Cây to, lên ảnh rất đẹp, đúng mô tả.",
    "isApproved": true,
    "createdAt": {
      "$date": "2026-03-11T12:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f800000000000000000004"
    },
    "productId": {
      "$oid": "65f300000000000000000005"
    },
    "user": {
      "id": {
        "$oid": "65f000000000000000000002"
      },
      "fullName": "Nguyễn Minh Anh"
    },
    "rating": 4,
    "comment": "Chậu xinh, phù hợp làm quà tặng.",
    "isApproved": true,
    "createdAt": {
      "$date": "2026-03-10T11:30:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f800000000000000000005"
    },
    "productId": {
      "$oid": "65f300000000000000000008"
    },
    "user": {
      "id": {
        "$oid": "65f000000000000000000003"
      },
      "fullName": "Trần Thu Hà"
    },
    "rating": 5,
    "comment": "Lá xanh đẹp, nhìn rất dịu mắt.",
    "isApproved": true,
    "createdAt": {
      "$date": "2026-03-12T01:15:00Z"
    }
  }
]);

db.inventory_logs.deleteMany({});
db.inventory_logs.insertMany([
  {
    "_id": {
      "$oid": "65f900000000000000000001"
    },
    "productId": {
      "$oid": "65f300000000000000000001"
    },
    "adminId": {
      "$oid": "65f000000000000000000001"
    },
    "actionType": "import",
    "quantityChanged": 20,
    "quantityBefore": 14,
    "quantityAfter": 34,
    "note": "Nhập thêm kim tiền đợt đầu tuần.",
    "createdAt": {
      "$date": "2026-03-11T01:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f900000000000000000002"
    },
    "productId": {
      "$oid": "65f300000000000000000002"
    },
    "adminId": {
      "$oid": "65f000000000000000000001"
    },
    "actionType": "export",
    "quantityChanged": 3,
    "quantityBefore": 55,
    "quantityAfter": 52,
    "note": "Xuất hàng theo đơn đã xác nhận.",
    "createdAt": {
      "$date": "2026-03-11T08:30:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f900000000000000000003"
    },
    "productId": {
      "$oid": "65f300000000000000000004"
    },
    "adminId": {
      "$oid": "65f000000000000000000001"
    },
    "actionType": "adjustment",
    "quantityChanged": -2,
    "quantityBefore": 20,
    "quantityAfter": 18,
    "note": "Điều chỉnh tồn do cây lỗi lá.",
    "createdAt": {
      "$date": "2026-03-11T09:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f900000000000000000004"
    },
    "productId": {
      "$oid": "65f300000000000000000005"
    },
    "adminId": {
      "$oid": "65f000000000000000000001"
    },
    "actionType": "import",
    "quantityChanged": 30,
    "quantityBefore": 37,
    "quantityAfter": 67,
    "note": "Nhập thêm lô sen đá mini.",
    "createdAt": {
      "$date": "2026-03-12T02:00:00Z"
    }
  },
  {
    "_id": {
      "$oid": "65f900000000000000000005"
    },
    "productId": {
      "$oid": "65f300000000000000000008"
    },
    "adminId": {
      "$oid": "65f000000000000000000001"
    },
    "actionType": "import",
    "quantityChanged": 12,
    "quantityBefore": 15,
    "quantityAfter": 27,
    "note": "Bổ sung lan ý để bàn cuối tuần.",
    "createdAt": {
      "$date": "2026-03-12T03:40:00Z"
    }
  }
]);

db.sales_stats.deleteMany({});
db.sales_stats.insertMany([
  {
    "_id": {
      "$oid": "65fa00000000000000000001"
    },
    "statDate": "2026-03-08",
    "totalOrders": 6,
    "totalProductsSold": 11,
    "revenue": 3140000
  },
  {
    "_id": {
      "$oid": "65fa00000000000000000002"
    },
    "statDate": "2026-03-09",
    "totalOrders": 8,
    "totalProductsSold": 14,
    "revenue": 4280000
  },
  {
    "_id": {
      "$oid": "65fa00000000000000000003"
    },
    "statDate": "2026-03-10",
    "totalOrders": 9,
    "totalProductsSold": 16,
    "revenue": 5120000
  },
  {
    "_id": {
      "$oid": "65fa00000000000000000004"
    },
    "statDate": "2026-03-11",
    "totalOrders": 11,
    "totalProductsSold": 19,
    "revenue": 6430000
  },
  {
    "_id": {
      "$oid": "65fa00000000000000000005"
    },
    "statDate": "2026-03-12",
    "totalOrders": 7,
    "totalProductsSold": 12,
    "revenue": 3860000
  }
]);
