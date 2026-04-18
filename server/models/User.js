import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, trim: true, unique: true, sparse: true },
    isEmailVerified: { type: Boolean, default: false },

    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },

    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    avatar: { type: String, default: null },

    addresses: [
      {
        recipientName: String,
        phone: String,
        province: String,
        district: String,
        ward: String,
        streetAddress: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
