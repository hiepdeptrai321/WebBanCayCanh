import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,64}$/;
const ALLOWED_GENDERS = new Set(["male", "female", "other"]);

const googleClient = new OAuth2Client();

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizePhone(value) {
  return String(value || "").trim();
}

function normalizeText(value) {
  return String(value || "").trim();
}

function getGoogleClientIds() {
  return String(
    process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_OAUTH_CLIENT_ID || "",
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function toAuthUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    username: user.username || "",
    email: user.email,
    phone: user.phone || "",
    avatar: user.avatar || null,
    role: user.role || "customer",
  };
}

function createAuthResponse(user, message) {
  const responseBody = {
    token: createToken(user._id),
    user: toAuthUser(user),
  };

  if (message) {
    responseBody.message = message;
  }

  return responseBody;
}

async function createSystemPasswordHash() {
  const salt = await bcrypt.genSalt(10);
  const randomSecret = crypto.randomBytes(32).toString("hex");
  return bcrypt.hash(randomSecret, salt);
}

async function createGooglePhoneNumber(googleId) {
  const numericPart = String(googleId || "")
    .replace(/\D/g, "")
    .slice(-8)
    .padStart(8, "0");

  let attempts = 0;

  while (attempts < 5) {
    const suffix =
      attempts === 0
        ? numericPart
        : String(Math.floor(Math.random() * 100000000)).padStart(8, "0");

    const candidatePhone = `09${suffix}`;
    const existingUser = await User.exists({ phone: candidatePhone });

    if (!existingUser) {
      return candidatePhone;
    }

    attempts += 1;
  }

  return `09${String(Date.now()).slice(-8)}`;
}

async function verifyGoogleCredential(credential) {
  const googleClientIds = getGoogleClientIds();

  if (!googleClientIds.length) {
    throw new Error("GOOGLE_CLIENT_ID is not configured.");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: googleClientIds,
  });

  const payload = ticket.getPayload();

  return {
    googleId: normalizeText(payload?.sub),
    email: normalizeEmail(payload?.email),
    emailVerified: Boolean(payload?.email_verified),
    fullName: normalizeText(payload?.name),
    avatar: normalizeText(payload?.picture),
  };
}

function getAge(dateValue) {
  const today = new Date();
  let age = today.getFullYear() - dateValue.getFullYear();
  const monthDelta = today.getMonth() - dateValue.getMonth();

  if (
    monthDelta < 0 ||
    (monthDelta === 0 && today.getDate() < dateValue.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function validateRegisterPayload(payload) {
  const fieldErrors = {};

  const fullName = normalizeText(payload.fullName);
  const email = normalizeEmail(payload.email);
  const phone = normalizePhone(payload.phone);
  const password = String(payload.password || "");
  const dateOfBirth = normalizeText(payload.dateOfBirth);
  const gender = normalizeText(payload.gender).toLowerCase();
  const province = normalizeText(payload.province);
  const district = normalizeText(payload.district);
  const ward = normalizeText(payload.ward);
  const streetAddress = normalizeText(payload.streetAddress);

  if (!fullName) {
    fieldErrors.fullName = "Vui lòng nhập họ và tên.";
  } else if (fullName.length < 2) {
    fieldErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự.";
  } else if (fullName.length > 80) {
    fieldErrors.fullName = "Họ và tên không được vượt quá 80 ký tự.";
  }

  if (!email) {
    fieldErrors.email = "Vui lòng nhập email.";
  } else if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = "Email không đúng định dạng.";
  }

  if (!phone) {
    fieldErrors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!PHONE_REGEX.test(phone)) {
    fieldErrors.phone = "Số điện thoại không hợp lệ (VD: 09xxxxxxxx).";
  }

  if (!password) {
    fieldErrors.password = "Vui lòng nhập mật khẩu.";
  } else if (!PASSWORD_REGEX.test(password)) {
    fieldErrors.password =
      "Mật khẩu cần ít nhất 8 ký tự gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
  }

  if (!dateOfBirth) {
    fieldErrors.dateOfBirth = "Vui lòng chọn ngày sinh.";
  } else {
    const parsedDate = new Date(dateOfBirth);
    if (Number.isNaN(parsedDate.getTime())) {
      fieldErrors.dateOfBirth = "Ngày sinh không hợp lệ.";
    } else {
      const age = getAge(parsedDate);
      if (age < 13) {
        fieldErrors.dateOfBirth = "Bạn phải từ 13 tuổi trở lên để đăng ký.";
      } else if (age > 120) {
        fieldErrors.dateOfBirth = "Ngày sinh không hợp lệ.";
      }
    }
  }

  if (!gender) {
    fieldErrors.gender = "Vui lòng chọn giới tính.";
  } else if (!ALLOWED_GENDERS.has(gender)) {
    fieldErrors.gender = "Giới tính không hợp lệ.";
  }

  if (!province) {
    fieldErrors.province = "Vui lòng chọn tỉnh/thành.";
  }

  if (!district) {
    fieldErrors.district = "Vui lòng chọn quận/huyện.";
  }

  if (!ward) {
    fieldErrors.ward = "Vui lòng chọn phường/xã.";
  }

  if (!streetAddress) {
    fieldErrors.streetAddress = "Vui lòng nhập địa chỉ cụ thể.";
  } else if (streetAddress.length < 5) {
    fieldErrors.streetAddress = "Địa chỉ cụ thể phải có ít nhất 5 ký tự.";
  } else if (streetAddress.length > 200) {
    fieldErrors.streetAddress = "Địa chỉ cụ thể không được vượt quá 200 ký tự.";
  }

  return fieldErrors;
}

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

    const fieldErrors = validateRegisterPayload(req.body);

    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        message: "Vui lòng kiểm tra lại thông tin đăng ký.",
        fieldErrors,
      });
    }

    const normalizedFullName = normalizeText(fullName);
    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);
    const normalizedGender = normalizeText(gender).toLowerCase();
    const normalizedProvince = normalizeText(province);
    const normalizedDistrict = normalizeText(district);
    const normalizedWard = normalizeText(ward);
    const normalizedStreetAddress = normalizeText(streetAddress);

    const [existingByEmail, existingByPhone] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      User.findOne({ phone: normalizedPhone }),
    ]);

    if (existingByEmail || existingByPhone) {
      const duplicateErrors = {};

      if (existingByEmail) {
        duplicateErrors.email = "Email đã tồn tại.";
      }

      if (existingByPhone) {
        duplicateErrors.phone = "Số điện thoại đã tồn tại.";
      }

      return res
        .status(400)
        .json({
          message: "Email hoặc số điện thoại đã tồn tại.",
          fieldErrors: duplicateErrors,
        });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName: normalizedFullName,
      email: normalizedEmail,
      phone: normalizedPhone,
      passwordHash,
      authProvider: "local",
      isEmailVerified: false,
      dateOfBirth: new Date(normalizeText(dateOfBirth)),
      gender: normalizedGender,
      addresses: [
        {
          province: normalizedProvince,
          district: normalizedDistrict,
          ward: normalizedWard,
          streetAddress: normalizedStreetAddress,
          isDefault: true,
        },
      ],
    });

    res.status(201).json(createAuthResponse(user, "Đăng ký thành công"));
  } catch (err) {
    if (err?.code === 11000) {
      const duplicateErrors = {};

      if (err?.keyPattern?.email) {
        duplicateErrors.email = "Email đã tồn tại.";
      }

      if (err?.keyPattern?.phone) {
        duplicateErrors.phone = "Số điện thoại đã tồn tại.";
      }

      return res.status(400).json({
        message: "Email hoặc số điện thoại đã tồn tại.",
        fieldErrors: duplicateErrors,
      });
    }

    console.error(err);
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const identifier = String(emailOrPhone || "").trim();
    const normalizedEmail = normalizeEmail(identifier);
    const normalizedPhone = normalizePhone(identifier);

    if (!identifier || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng nhập" });
    }

    // 1. Tìm user bằng Email hoặc Số điện thoại
    const user = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone: normalizedPhone }],
    });

    if (!user) {
      return res.status(401).json({ message: "Thông tin đăng nhập không đúng" });
    }

    if (user.status === "inactive" || user.status === "blocked") {
      return res.status(403).json({ message: "Tài khoản đang bị khóa hoặc tạm ngưng." });
    }

    if (!user.passwordHash) {
      return res
        .status(401)
        .json({ message: "Tài khoản này dùng Gmail. Vui lòng đăng nhập bằng Gmail." });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatched) {
      if (user.authProvider === "google") {
        return res
          .status(401)
          .json({ message: "Tài khoản này dùng Gmail. Vui lòng đăng nhập bằng Gmail." });
      }

      return res.status(401).json({ message: "Thông tin đăng nhập không đúng" });
    }

    res.json(createAuthResponse(user));
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const username = normalizeText(req.body?.username).toLowerCase();
    const password = String(req.body?.password || "").trim();

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin đăng nhập quản trị" });
    }

    const adminUser =
      (await User.findOne({ role: "admin", username })) ||
      (username === "admin"
        ? await User.findOne({ role: "admin" }).sort({
            createdAt: 1,
          })
        : null);

    if (!adminUser) {
      return res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu quản trị không đúng" });
    }

    if (adminUser.status === "inactive" || adminUser.status === "blocked") {
      return res
        .status(403)
        .json({ message: "Tài khoản quản trị đang bị khóa hoặc tạm ngưng." });
    }

    if (!adminUser.passwordHash) {
      return res.status(401).json({
        message: "Tài khoản quản trị chưa có mật khẩu hợp lệ trong hệ thống.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      adminUser.passwordHash,
    );

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu quản trị không đúng" });
    }

    return res.json(
      createAuthResponse(adminUser, "Đăng nhập quản trị thành công"),
    );
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const credential = normalizeText(req.body?.credential);

    if (!credential) {
      return res.status(400).json({ message: "Thiếu credential từ Google." });
    }

    const googleProfile = await verifyGoogleCredential(credential);

    if (!googleProfile.googleId || !googleProfile.email || !googleProfile.emailVerified) {
      return res.status(401).json({ message: "Không thể xác thực tài khoản Gmail." });
    }

    let user = await User.findOne({
      $or: [
        { email: googleProfile.email },
        { googleId: googleProfile.googleId },
      ],
    });

    if (!user) {
      const [passwordHash, phone] = await Promise.all([
        createSystemPasswordHash(),
        createGooglePhoneNumber(googleProfile.googleId),
      ]);

      user = await User.create({
        fullName: googleProfile.fullName || googleProfile.email.split("@")[0],
        email: googleProfile.email,
        phone,
        passwordHash,
        authProvider: "google",
        googleId: googleProfile.googleId,
        isEmailVerified: true,
        gender: "other",
        avatar: googleProfile.avatar || null,
        addresses: [],
      });
    } else {
      const updates = {};

      if (!user.googleId) {
        updates.googleId = googleProfile.googleId;
      }

      if (!user.avatar && googleProfile.avatar) {
        updates.avatar = googleProfile.avatar;
      }

      if ((!user.fullName || user.fullName.trim().length < 2) && googleProfile.fullName) {
        updates.fullName = googleProfile.fullName;
      }

      if (!user.isEmailVerified) {
        updates.isEmailVerified = true;
      }

      if (Object.keys(updates).length > 0) {
        user = await User.findByIdAndUpdate(
          user._id,
          { $set: updates },
          { new: true },
        );
      }
    }

    if (user.status === "inactive" || user.status === "blocked") {
      return res.status(403).json({ message: "Tài khoản đang bị khóa hoặc tạm ngưng." });
    }

    return res.json(createAuthResponse(user, "Đăng nhập Google thành công"));
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ message: "Không thể xác thực tài khoản Gmail. Vui lòng thử lại." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const normalizedNewPassword = String(newPassword || "").trim();

    if (!normalizedEmail || !normalizedNewPassword) {
      return res.status(400).json({ message: "Email và mật khẩu mới là bắt buộc" });
    }

    if (normalizedNewPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(normalizedNewPassword, salt);

    // Dùng findOneAndUpdate để ép dữ liệu xuống DB
    const result = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { passwordHash: hashedNewPassword } },
      { new: true },
    );

    if (result) {
      return res.status(200).json({ message: "Thành công!" });
    } else {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
  } catch (err) {
    console.error("LỖI NGHIÊM TRỌNG:", err);
    res.status(500).json({ message: err.message });
  }
};
