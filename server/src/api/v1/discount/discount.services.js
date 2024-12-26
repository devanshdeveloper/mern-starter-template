import BasicServices from "../basic.services";
import Discount from "./discount.model";

export class DiscountServices extends BasicServices {
  constructor() {
    super(Discount);
  }
}

const discountServices = new DiscountServices();

export default discountServices;
