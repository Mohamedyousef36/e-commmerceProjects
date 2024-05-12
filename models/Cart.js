import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
  cartItem: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      price: Number,
      quantity: Number,
      color: String,
    },
  ],
  totalPrice: Number,
  priceAfterDiscount: Number,

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model('Cart',CartSchema)