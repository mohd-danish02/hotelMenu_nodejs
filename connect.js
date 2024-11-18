const mongoose = require("mongoose");

// mongo db connection

mongoose
  .connect("mongodb://127.0.0.1:27017/My-Hotel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected successfully"))
  .catch((err) => console.log("Mongodb is not connected", err));

// create user schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model
const User = mongoose.model("User", userSchema);

module.exports = User;
