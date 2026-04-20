export const adminNavItems = [
  { key: 'dashboard', label: 'Tổng quan', path: '/admin/dashboard' },
  { key: 'products', label: 'Sản phẩm', path: '/admin/products' },
  { key: 'categories', label: 'Danh mục', path: '/admin/categories' },
  { key: 'inventory', label: 'Tồn kho', path: '/admin/inventory' },
  { key: 'orders', label: 'Đơn hàng', path: '/admin/orders' },
  { key: 'reviews', label: 'Đánh giá', path: '/admin/reviews' },
  { key: 'users', label: 'Người dùng', path: '/admin/users' },
  { key: 'blog-posts', label: 'Bài viết', path: '/admin/blog-posts' },
  { key: 'stores', label: 'Cửa hàng', path: '/admin/stores' },
  { key: 'content', label: 'Nội dung giới thiệu', path: '/admin/content' },
]

export function getAdminPageTitle(pathname) {
  const currentItem = adminNavItems.find((item) => pathname.startsWith(item.path))
  return currentItem?.label || 'Quản trị'
}
