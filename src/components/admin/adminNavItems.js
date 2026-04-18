export const adminNavItems = [
  { key: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
  { key: 'products', label: 'Products', path: '/admin/products' },
  { key: 'categories', label: 'Categories', path: '/admin/categories' },
  { key: 'inventory', label: 'Inventory', path: '/admin/inventory' },
  { key: 'orders', label: 'Orders', path: '/admin/orders' },
  { key: 'reviews', label: 'Reviews', path: '/admin/reviews' },
  { key: 'users', label: 'Users', path: '/admin/users' },
  { key: 'blog-posts', label: 'Blog Posts', path: '/admin/blog-posts' },
  { key: 'stores', label: 'Stores', path: '/admin/stores' },
  { key: 'content', label: 'About Content', path: '/admin/content' },
]

export function getAdminPageTitle(pathname) {
  const currentItem = adminNavItems.find((item) => pathname.startsWith(item.path))
  return currentItem?.label || 'Admin'
}
