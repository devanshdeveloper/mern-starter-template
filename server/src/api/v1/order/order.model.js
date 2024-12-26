import { model, Schema } from "mongoose";
import { OrderStatuses } from "../variable/order-status";
import { PaymentMethodTypes } from "../variable/payment-method-types";
import { PaymentStatusTypes } from "../variable/payment-status-types";

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storefront: {
      type: Schema.Types.ObjectId,
      ref: "Storefront",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    status: {
      type: String,
      enum: OrderStatuses,
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethodTypes,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatusTypes,
      default: "Pending",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;
