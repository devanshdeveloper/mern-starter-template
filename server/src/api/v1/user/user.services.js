import isThis from "@devanshdeveloper/is-this";
import { Response } from "../../../utils/response";
import BasicServices from "../basic.services";
import User from "./user.model";

export class UserServices extends BasicServices {
  constructor() {
    super(User);
  }

  ["login"] = async (c) => {
    const body = c.req.body();
    const data = body?.data;
    const email = data?.email;
    const password = data?.password;

    if (!email) {
      return Response(c)
        .error({
          name: "ValidationError",
          message: "Email is required!",
        })
        .send();
    }

    if (!isThis.isValidEmail(email)) {
      return Response(c)
        .error({
          name: "ValidationError",
          message: "Invalid email format!",
        })
        .send();
    }

    if (!password) {
      return Response(c)
        .error({
          name: "ValidationError",
          message: "Password is required!",
        })
        .send();
    }

    try {
      const user = await this.findOne({ email }).select("+password");
      if (!user) {
        return Response(c)
          .error({
            name: "NotFoundError",
            message: "User not found!",
          })
          .send();
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return Response(c)
          .error({
            name: "UnauthorizedError",
            message: "Incorrect Password!",
          })
          .send();
      }
      return Response(c)
        .body(user)
        .message("User succesfully logged in!")
        .send();
    } catch (error) {
      return Response(c).error(error).send();
    }
  };
}

const userServices = new UserServices();

export default userServices;
