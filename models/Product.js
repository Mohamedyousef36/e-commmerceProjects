import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "product name is required"],
      unique: [true, "product name must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    imageCover: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price required"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: {
      type: [String],
    },
    desc: {
      type: String,
      required: [true, "product description required"],
      minlength: [20, "too short description"],
    },
    ratingsAverage: {
      type: Number,
      min: 1,
      max: 5,
    },
    numberOfRating: {
      type: Number,
      default: 0,
    },
    category: {
      
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "required category name"],
    },
    subCategory: {
      type: [mongoose.Schema.ObjectId],
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});

ProductSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
//  set image url
const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
};

// get get all
ProductSchema.post("init", function (doc) {
  setImageUrl(doc);
});
// create
ProductSchema.post("save", function (doc) {
  setImageUrl(doc);
});

export default mongoose.model("Product", ProductSchema);
