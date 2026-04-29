export const contactChannels = [
  {
    id: "phone",
    title: "Hotline hỗ trợ",
    value: "0833 449 449",
    hint: "Phản hồi nhanh trong giờ làm việc",
    actionLabel: "Gọi ngay",
    href: "tel:0833449449",
  },
  {
    id: "email",
    title: "Email hỗ trợ",
    value: "support@gocxanhshop.vn",
    hint: "Tiếp nhận yêu cầu 24/7",
    actionLabel: "Gửi email",
    href: "mailto:support@gocxanhshop.vn",
  },
  {
    id: "address",
    title: "Văn phòng chính",
    value: "12 Nguyễn Văn Bảo, Hạnh Thông, Hồ Chí Minh",
    hint: "Có khu vực tư vấn trực tiếp",
    actionLabel: "Xem đường đi",
    href: "https://www.google.com/maps/search/?api=1&query=12+Nguyen+Van+Bao+Hanh+Thong+Ho+Chi+Minh",
  },
  {
    id: "hours",
    title: "Giờ làm việc",
    value: "08:00 - 20:00 (Thứ 2 - Chủ nhật)",
    hint: "Hỗ trợ ngoài giờ qua email",
    actionLabel: "Đặt lịch tư vấn",
    href: "#support-form",
  },
];

export const faqItems = [
  {
    id: "order",
    question: "Làm sao để đặt hàng?",
    answer:
      "Bạn có thể chọn cây tại trang Sản phẩm, thêm vào giỏ hàng và bấm Thanh toán. Nếu cần tư vấn loại cây phù hợp không gian, hãy để lại thông tin tại form hỗ trợ để đội ngũ liên hệ trong vòng 15-30 phút.",
  },
  {
    id: "shipping-time",
    question: "Thời gian giao hàng bao lâu?",
    answer:
      "Khu vực TP.HCM thường giao trong 2-6 giờ tùy khung giờ và điều kiện thời tiết. Các tỉnh lân cận từ 1-3 ngày. Đơn hàng cây lớn hoặc dự án sẽ có lịch hẹn cụ thể trước khi giao.",
  },
  {
    id: "inspection",
    question: "Tôi có được kiểm tra cây trước khi nhận không?",
    answer:
      "Có. Bạn được kiểm tra tình trạng cây, chậu và phụ kiện trước khi thanh toán phần còn lại. Nếu cây bị dập gãy do vận chuyển, chúng tôi hỗ trợ đổi ngay hoặc hoàn tiền theo chính sách.",
  },
  {
    id: "return-policy",
    question: "Chính sách đổi trả như thế nào?",
    answer:
      "Đổi trả trong 48 giờ với lỗi do vận chuyển hoặc cây không đúng mô tả. Với cây bị sốc môi trường sau khi nhận, đội ngũ kỹ thuật sẽ hướng dẫn phục hồi miễn phí và xem xét đổi cây nếu cần.",
  },
  {
    id: "care-guide",
    question: "Cách chăm sóc cây sau khi mua?",
    answer:
      "Mỗi cây đi kèm hướng dẫn tưới nước, ánh sáng và phân bón cơ bản. Bạn cũng có thể nhắn hình cây cho đội ngũ hỗ trợ để được tư vấn cá nhân hóa theo điều kiện không gian thực tế.",
  },
  {
    id: "contact-consult",
    question: "Làm sao để liên hệ tư vấn?",
    answer:
      "Bạn có thể gọi hotline, gửi email hoặc điền form hỗ trợ ngay trên trang này. Trong giờ cao điểm, đội ngũ ưu tiên phản hồi theo thứ tự yêu cầu nhưng luôn cố gắng phản hồi sớm nhất.",
  },
];

export const quickActions = [
  {
    id: "track-order",
    title: "Theo dõi đơn hàng",
    description: "Kiểm tra trạng thái đơn và xác nhận thời gian giao.",
    to: "/checkout",
  },
  {
    id: "shipping-policy",
    title: "Chính sách vận chuyển",
    description: "Xem quy định khu vực giao, phí vận chuyển và thời gian.",
    to: "#faq-section",
  },
  {
    id: "return-policy",
    title: "Chính sách đổi trả",
    description: "Nắm rõ điều kiện đổi trả để an tâm mua sắm.",
    to: "#faq-section",
  },
  {
    id: "care-manual",
    title: "Hướng dẫn chăm sóc cây",
    description: "Xem các bài viết giúp cây luôn xanh khỏe sau khi mua.",
    to: "/blog",
  },
  {
    id: "consultation",
    title: "Liên hệ tư vấn",
    description: "Gửi yêu cầu và nhận tư vấn theo nhu cầu thực tế của bạn.",
    to: "#support-form",
  },
];
