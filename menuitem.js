const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tase: {
      type: String,
      enum: ["sweet", "spicy", "sour"],
      required: true,
      lowercase: true,
    },
    is_drink: {
      type: Boolean,
      default: false,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    num_sales: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const menuItem = mongoose.model("menuItem", menuItemSchema);

module.exports = menuItem;
