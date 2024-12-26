import { Schema } from "mongoose";
import { notificationTypes } from "../variable/notification-types";

const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a 'User' model for reference
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: notificationTypes, 
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false, 
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed, 
      default: {},
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a Notification model
const Notification = model("Notification", notificationSchema);

export default Notification;
