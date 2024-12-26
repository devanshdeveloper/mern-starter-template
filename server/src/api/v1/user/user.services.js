import isThis from "@devanshdeveloper/is-this";
import { Response } from "../../../utils/response";
import BasicServices from "../basic.services";
import User from "./user.model";
import jwtUtils from "../../../utils/jwt";
import bcrypt from "bcrypt";
import Roles from "../../../constansts/roles";
export class UserServices extends BasicServices {
  constructor() {
    super(User);
    super.setBlacklistKeysByRoles({
      [Roles.SuperAdmin]: [],
      [Roles.Admin]: ["role"],
      [Roles.User]: [],
      [Roles.Guest]: [],
    });
  }
  register = async (c) => {
    try {
      const { data } = await c.req.json().catch(() => null).catch(() => null)

      if (!isThis.isObject(data)) {
        return Response(c).error({
          message: "The 'data' field must be an object.",
          name: "ValidationError",
        });
      }

      const response = await this["create-one"](c);

      if (!response?.response?.[0]?.success) {
        return response;
      }
      const user = response?.response?.[0]?.data;
      const token = jwtUtils.generateToken({ _id: user._id, role: user.role });
      return Response(c)
        .body({ user, token })
        .message("User successfully registered!");
    } catch (error) {
      return Response(c).error(error);
    }
  };

  ["login"] = async (c) => {
    const body = await c.req.json().catch(() => null).catch(() => null)

    const data = body?.data;
    const email = data?.email;
    const password = data?.password;

    if (!email) {
      return Response(c).error({
        name: "ValidationError",
        message: "Email is required!",
      });
    }

    if (!isThis.isValidEmail(email)) {
      return Response(c).error({
        name: "ValidationError",
        message: "Invalid email format!",
      });
    }

    if (!password) {
      return Response(c).error({
        name: "ValidationError",
        message: "Password is required!",
      });
    }

    try {
      const user = await this.findOne({ email }).select("+password");
      if (!user) {
        return Response(c).error({
          name: "NotFoundError",
          message: "User not found!",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return Response(c).error({
          name: "UnauthorizedError",
          message: "Incorrect Password!",
        });
      }
      const token = jwtUtils.generateToken({ _id: user._id, role: user.role });
      return Response(c)
        .body({ user, token })
        .message("User succesfully logged in!");
    } catch (error) {
      return Response(c).error(error);
    }
  };
  ["change-password"] = async (c) => {
    const body = c.req.json().catch(() => null).catch(() => null)
    const data = body?.data;
    const oldPassword = data?.oldPassword;
    const newPassword = data?.newPassword;
    const confirmPassword = data?.confirmPassword;
    const userId = c.req.user?.id;
  };
}

const userServices = new UserServices();

export default userServices;
