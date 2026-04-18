import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
      province,
      district,
      ward,
      streetAddress,
    } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email hoặc số điện thoại đã tồn tại" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Lưu ý: Mapping lại dữ liệu address từ form vào mảng addresses của Schema
    const user = await User.create({
      fullName,
      email,
      phone,
      passwordHash,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender,
      addresses: [{ province, district, ward, streetAddress, isDefault: true }],
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    // 1. Tìm user bằng Email hoặc Số điện thoại
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    // 2. So sánh mật khẩu (password người dùng nhập vs passwordHash trong DB)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res
        .status(401)
        .json({ message: "Thông tin đăng nhập không đúng" });
    }

    // 3. Tạo JWT Token để duy trì phiên đăng nhập
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("--- Bắt đầu Reset Password ---");
    console.log("Email nhận được:", email);

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Dùng findOneAndUpdate để ép dữ liệu xuống DB
    const result = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $set: { passwordHash: hashedNewPassword } },
      { new: true },
    );

    if (result) {
      console.log("Cập nhật thành công vào DB cho User:", result.email);
      console.log("Hash mới trong DB:", result.passwordHash);
      return res.status(200).json({ message: "Thành công!" });
    } else {
      console.log("KHÔNG TÌM THẤY USER VỚI EMAIL NÀY");
      return res.status(404).json({ message: "Email không tồn tại" });
    }
  } catch (err) {
    console.error("LỖI NGHIÊM TRỌNG:", err);
    res.status(500).json({ message: err.message });
  }
};
