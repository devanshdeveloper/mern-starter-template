import { model, Schema } from "mongoose";

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressLine1: {
      type: Schema.Types.String,
      required: true,
    },
    addressLine2: {
      type: Schema.Types.String,
      required: false,
    },
    city: {
      type: Schema.Types.String,
      required: true,
    },
    state: {
      type: Schema.Types.String,
      required: true,
    },
    postalCode: {
      type: Schema.Types.String,
      required: true,
    },
    country: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

const Address = model("Address", addressSchema);

export default Address;
