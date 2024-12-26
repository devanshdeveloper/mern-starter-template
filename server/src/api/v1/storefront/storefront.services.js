import { Response } from "../../../utils/response";
import BasicServices from "../basic.services";
import Storefront from "./storefront.model";

export class StorefrontServices extends BasicServices {
  constructor() {
    super(Storefront);
    super.events.on("on-create", ({ data , user }) => {
      data.createdBy = user._id;
      return { data };
    });
  }
}

const storefrontServices = new StorefrontServices();

export default storefrontServices;
