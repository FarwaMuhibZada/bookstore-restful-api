const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Role-based access control
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash password before saving
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // Compare entered password with hashed one
};

const User = mongoose.model("User", userSchema);
module.exports = User;
