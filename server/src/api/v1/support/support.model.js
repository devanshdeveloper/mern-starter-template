import { model, Schema } from "mongoose";
const SupportSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    requestType: {
      type: String,
      required: true,
      enum: SupportRequestTypes,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Support = model("Support", SupportSchema);

export default Support;
