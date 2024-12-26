import { Response } from "../../../utils/response";
import BasicServices from "../basic.services";
import Order from "./order.model";

export class OrderServices extends BasicServices {
  constructor() {
    super(Order);
  }
}

const orderServices = new OrderServices();

export default orderServices;
