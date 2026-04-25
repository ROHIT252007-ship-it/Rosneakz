import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      required: true,
      enum: ['Today', 'Yesterday', 'Older'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    originalPrice: {
      type: String,
      required: true,
      trim: true,
    },
    discountPrice: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    isUnread: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;