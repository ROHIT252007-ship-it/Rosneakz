import mongoose from "mongoose";

const { Schema } = mongoose;

const relatedVariantSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    colorCode: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    colorCode: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    sizes: [
      {
        type: Number,
        required: true,
      },
    ],
    relatedVariants: {
      type: [relatedVariantSchema],
      default: [],
    },
  },
  { _id: false }
);

const cartItemSchema = new Schema(
  {
    product: {
      type: productSchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    selectedSize: {
      type: Number,
      required: true,
    },
    selectedColor: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const userCartSchema = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    cart: {
      type: [cartItemSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const UserCart = mongoose.model("UserCart", userCartSchema);

export default UserCart;