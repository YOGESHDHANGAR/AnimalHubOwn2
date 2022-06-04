const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "नाम आवश्यक "],
    maxLength: [30, "कृपया 30 अक्षरों  से छोटा  नाम लिखे "],
    minLength: [3, "कृपया 3 अक्षरों  से बड़ा नाम लिखे "],
  },
  mobileNumber: {
    type: Number,
    required: [true, "मोबाइल नंबर आवश्यक"],
    maxLength: [10, "मोबाइल नंबर अमान्य !"],
  },

  avatar: {
    public_id: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  userAnimals: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
      // required: true,
    },
  ],
  userCalls: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
      // required: true,
    },
  ],
  place: {
    type: String,
  },
  pinCode: {
    type: Number,
    default: 452001,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
