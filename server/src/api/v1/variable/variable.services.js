import isThis from "@devanshdeveloper/is-this";
import { variables } from ".";
import { Response } from "../../../utils/response";

export class VariableServices {
  constructor() {}
  ["read-all"](c) {
    return Response(c).body(variables).message("Value found successfully!");
  }
  ["read-one"](c) {
    const { key } = c.req.query();
    const value = variables[key];

    if (!isThis.isNullOrUndefined(value)) {
      return Response(c).body(value).message("Value found successfully!");
    } else {
      return Response(c).message({
        name: "NotFound",
        message: "Error finding variable!",
      });
    }
  }
}

const variableServices = new VariableServices();

export default variableServices;
