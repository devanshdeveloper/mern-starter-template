import { Hono } from "hono";
import { Response } from "../../utils/response";
import userServices from "./user/user.services";
import productServices from "./product/product.services";
import storefrontServices from "./storefront/storefront.services";
import Roles from "../../constansts/roles";
import jwtUtils from "../../utils/jwt";
import pageServices from "./page.services";
import orderServices from "./order/order.services";
import addressServices from "./address/address.services";
import variableServices from "./variable/variable.services";

const servicesRoute = new Hono().basePath("/");

// Service mappings
const servicesObj = {
  users: userServices,
  products: productServices,
  storefronts: storefrontServices,
  orders: orderServices,
  address: addressServices,
  variables: variableServices,
  pages: pageServices,
};

// Allowed methods for service functions
const allowedServiceMethodsOnRequestMethods = {
  GET: [
    "read-one",
    "read-all",
    "read-one-by-query",
    "read-one-by-param",
    "paginate",
    "aggregate",
  ],
  POST: ["create-one", "create-many", "login", "register"],
  PATCH: ["update-one"],
  DELETE: ["delete-one", "soft-delete-one", "soft-delete-many", "delete-many"],
};

const bypassAllowedServiceMethodsOnRequestMethodsForServiceName = ["pages"];

const allowedServicePathsByRoles = {
  [Roles.SuperAdmin]: "all",
  [Roles.Admin]: [],
  [Roles.User]: [],
  guest: [
    "users:register",
    "users:login",
    "variables:read-one",
    "variables:read-all",
  ],
};

servicesRoute.all("/:serviceName/:serviceMethod", async (c) => {
  try {
    const { serviceName, serviceMethod } = c.req.param();
    // service vars
    const servicePath = `${serviceName}:${serviceMethod}`;
    const serviceFunction = servicesObj?.[serviceName]?.[serviceMethod];

    // req vars
    const requestMethod = c.req.method;
    const headers = c.req.header();
    const authorization = headers?.authorization;
    const token = authorization?.replace?.("Bearer ", "");

    if (typeof serviceFunction !== "function") {
      return Response(c)
        .error({
          name: "InvalidService",
          message: "Function not found",
        })
        .send();
    }

    if (
      !bypassAllowedServiceMethodsOnRequestMethodsForServiceName.includes(
        serviceName
      )
    ) {
      const allowedRequestMethods = Object.keys(
        Object.fromEntries(
          Object.entries(allowedServiceMethodsOnRequestMethods).filter(
            ([key, allowedServiceMethods]) => {
              return allowedServiceMethods.includes(serviceMethod);
            }
          )
        )
      );

      if (allowedRequestMethods.length === 0) {
        return Response(c)
          .error({
            name: "MethodNotAllowed",
            message: `Method ${serviceMethod} is not allowed on ${serviceName} service.`,
          })
          .send();
      }

      if (!allowedRequestMethods.includes(requestMethod)) {
        return Response(c)
          .error({
            name: "MethodNotAllowed",
            message: `${requestMethod} Method is not allowed. Allowed methods are ${allowedRequestMethods.join(
              ", "
            )}`,
          })
          .headers({
            Allow: allowedRequestMethods[0],
          })
          .send();
      }
    }

    const user = jwtUtils.decodeToken(token);
    const userRole = user?.role || Roles.Guest;
    c.set("user", user);

    if (allowedServicePathsByRoles[userRole] !== "all") {
      if (userRole !== Roles.SuperAdmin) {
        if (userRole === Roles.Admin) {
          const allowedServicePaths = [
            ...allowedServicePathsByRoles[Roles.Admin],
            ...allowedServicePathsByRoles[Roles.User],
            ...allowedServicePathsByRoles[Roles.Guest],
          ];

          if (!allowedServicePaths.includes(servicePath)) {
            return Response(c)
              .error({
                name: "ForbiddenError",
                message: "You don't have permission to perform this action.",
              })
              .send();
          }
        }

        if (userRole === Roles.User) {
          const allowedServicePaths = [
            ...allowedServicePathsByRoles[Roles.User],
            ...allowedServicePathsByRoles[Roles.Guest],
          ];

          if (!allowedServicePaths.includes(servicePath)) {
            return Response(c)
              .error({
                name: "ForbiddenError",
                message: "You don't have permission to perform this action.",
              })
              .send();
          }
        }

        if (userRole === Roles.Guest) {
          const allowedServicePaths = allowedServicePathsByRoles[Roles.Guest];

          if (!allowedServicePaths.includes(servicePath)) {
            return Response(c)
              .error({
                name: "ForbiddenError",
                message: "You don't have permission to perform this action.",
              })
              .send();
          }
        }
      }
    }
    return (await serviceFunction(c)).send();
  } catch (error) {
    return Response(c).error(error).send();
  }
});

export default servicesRoute;
