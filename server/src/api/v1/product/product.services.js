import { Response } from "../../../utils/response";
import BasicServices from "../basic.services";
import Product from "./product.model";

export class ProductServices extends BasicServices {
  constructor() {
    super(Product);
  }

}

const productServices = new ProductServices();

export default productServices;
