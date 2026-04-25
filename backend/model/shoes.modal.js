import mongoose from "mongoose";

const relatedVariantSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
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

const shoeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
    },
    groupId: {
      type: String,
      required: true,
      index: true,
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
      enum: ["Nike", "Adidas", "Puma", "Reebok", "ASICS", "New Balance"],
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
      enum: ["Men", "Women", "Unisex"],
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
      min: 0,
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
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one image is required",
      },
    },
    sizes: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one size is required",
      },
    },
    relatedVariants: {
      type: [relatedVariantSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

shoeSchema.index({ brand: 1 });
shoeSchema.index({ name: 1 });
shoeSchema.index({ color: 1 });
shoeSchema.index({ groupId: 1, color: 1 });

const Shoes = mongoose.model("Shoes", shoeSchema);

export default Shoes
