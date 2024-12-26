import { Response } from "../../../utils/response";
import BasicServices from "../basic.services";
import Address from "./address.model";

export class AddressServices extends BasicServices {
  constructor() {
    super(Address);
  }
}

const addressServices = new AddressServices();

export default addressServices;
