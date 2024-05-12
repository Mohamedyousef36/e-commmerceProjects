import mongoose from "mongoose";
import Product from "./Product.js";

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    }



}, { timestamps: true });

ReviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name"
    })
    next();
});

ReviewSchema.statics.calcRatingAvgAndQuantity = async function (productId) {
    const result = await this.aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: "product",
          ratingsAvg: { $avg: "$rating" },

          numberOfRating: { $sum: 1 },
        },
      },
    ]);
     
    if (result.length > 0) {
    await Product.findByIdAndUpdate(
      productId,
      {
        ratingsAverage: result[0].ratingsAvg,
        numberOfRating: result[0].numberOfRating,
      },
      { new: true }
    );
    
    } else {
           await Product.findByIdAndUpdate(productId, {
             ratingsAverage: 0,
             numberOfRating: 0,
           });
    }
    }

 
ReviewSchema.post('save',async function () {
 await this.constructor.calcRatingAvgAndQuantity(this.product)
})

ReviewSchema.post('remove', async function () {
  console.log("removed");
  await this.constructor.calcRatingAvgAndQuantity(this.product);
});
export default mongoose.model('Review', ReviewSchema)