# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Products

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | /products         | Get all products     |
| GET    | /products/:id     | Get product by ID    |
| POST   | /products         | Create new product   |
| PUT    | /products/:id     | Update product       |
| DELETE | /products/:id     | Delete product       |

## Orders

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | /orders        | Get all orders       |
| GET    | /orders/:id    | Get order by ID      |
| POST   | /orders        | Create new order     |
| PUT    | /orders/:id    | Update order status  |
