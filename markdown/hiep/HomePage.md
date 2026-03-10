You are a frontend developer working on a React + Vite + TailwindCSS project.

Your task is to create a modern **Trang Chủ cho website bán cây cảnh**, lấy cảm hứng bố cục và phong cách từ website sau:

https://joygarden.vn/

Lưu ý:
Không sao chép nội dung từ website trên. Chỉ lấy cảm hứng về **layout, bố cục và phong cách thiết kế**.

Trang phải responsive và chia thành các component React rõ ràng.

Sử dụng:
React functional components
TailwindCSS

Cấu trúc file:

src/pages/Home/HomePage.jsx
src/pages/Home/components/

Trang Home cần có các section sau:

-------------------------------------

1. HERO SECTION (Banner đầu trang)

Đây là banner lớn ở đầu trang.

Layout:

Bên trái:
Tiêu đề:
"Mang thiên nhiên vào không gian sống"

Mô tả:
"Khám phá những loại cây cảnh đẹp giúp không gian của bạn trở nên xanh mát và thư giãn hơn."

Nút:
"Mua ngay"

Bên phải:
Hình ảnh cây cảnh lớn.

Style:

- full width
- phong cách tự nhiên
- màu xanh lá chủ đạo
- typography lớn

-------------------------------------

2. SẢN PHẨM NỔI BẬT

Tiêu đề section:

"Sản phẩm nổi bật"

Hiển thị dạng grid gồm 4 sản phẩm.

Mỗi sản phẩm gồm:

- Hình ảnh
- Tên cây
- Giá tiền
- Nút "Xem chi tiết"

Tạo component:

ProductCard.jsx

-------------------------------------

3. DANH MỤC CÂY CẢNH

Tiêu đề:

"Danh mục cây cảnh"

Các danh mục ví dụ:

- Cây trong nhà
- Cây ngoài trời
- Cây mini
- Sen đá & xương rồng

Mỗi card gồm:

- hình ảnh
- tên danh mục

Hiệu ứng hover:

- phóng to nhẹ hình ảnh

-------------------------------------

4. TẠI SAO CHỌN CHÚNG TÔI

Tiêu đề:

"Vì sao nên chọn cây tại cửa hàng chúng tôi"

Tạo 3 khối thông tin:

Cây khỏe mạnh  
"Cây được tuyển chọn kỹ lưỡng và chăm sóc cẩn thận."

Giao hàng nhanh  
"Giao hàng nhanh chóng trong vòng 24-48 giờ."

Hỗ trợ chăm sóc cây  
"Hướng dẫn chi tiết giúp bạn chăm sóc cây tốt hơn."

Sử dụng icon cho mỗi mục.

Layout:

3 cột desktop  
stack trên mobile

-------------------------------------

5. BANNER KHUYẾN MÃI

Banner ngang.

Ví dụ nội dung:

"Giảm giá 20% cho cây trong nhà"

Mô tả nhỏ:
"Ưu đãi trong thời gian có hạn."

Nút:

"Mua ngay"

Nền:

gradient xanh lá nhẹ.

-------------------------------------

6. MẸO CHĂM SÓC CÂY

Tiêu đề:

"Mẹo chăm sóc cây"

Hiển thị 3 bài viết.

Mỗi card gồm:

- hình ảnh
- tiêu đề bài viết
- mô tả ngắn
- nút "Đọc thêm"

-------------------------------------

7. FOOTER

Footer gồm:

Tên cửa hàng

Menu nhanh:
Trang chủ  
Sản phẩm  
Giỏ hàng  
Liên hệ

Thông tin liên hệ:

Địa chỉ  
Số điện thoại  
Email

Icon mạng xã hội.

-------------------------------------

Yêu cầu kỹ thuật:

Sử dụng TailwindCSS.

Trang phải responsive:

mobile
tablet
desktop

Tách component rõ ràng:

HeroSection.jsx  
FeaturedProducts.jsx  
CategorySection.jsx  
BenefitsSection.jsx  
PromotionBanner.jsx  
BlogSection.jsx

Sau đó import tất cả vào:

HomePage.jsx

-------------------------------------

Thiết kế tổng thể phải mang cảm giác:

tự nhiên  
hiện đại  
màu xanh lá  
tối giản  
phù hợp website bán cây cảnh

Chỉ tạo giao diện UI, không cần logic backend.