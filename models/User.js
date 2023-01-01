const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 150,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 150,
    },
    googleId: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods.generateJwt = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24d" }
  );
  return token;
};

module.exports.User = model("User", UserSchema);
