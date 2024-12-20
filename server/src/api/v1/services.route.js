import { Hono } from "hono";
import { Response } from "../../utils/response";
import userServices from "./user/user.services";

const servicesRoute = new Hono().basePath("/");

// Service mappings
const servicesObj = {
  users: userServices,
};

// Allowed methods for service functions
const allowedServiceMethodsOnRequestMethods = {
  GET: [
    "read-one",
    "read-all",
    "read-one-by-query",
    "read-one-by-param",
    "paginate",
  ],
  POST: ["create-one", "login"],
  PATCH: ["update-one"],
  DELETE: ["delete-one", "soft-delete", "delete-many"],
};

servicesRoute.all("/:serviceName/:serviceMethod", async (c) => {
  try {
    const { serviceName, serviceMethod } = c.req.param();
    const requestMethod = c.req.method;

    const serviceFunction = servicesObj?.[serviceName]?.[serviceMethod];

    if (typeof serviceFunction !== "function") {
      return Response(c)
        .error({
          name: "InvalidService",
          message: "Function not found",
        })
        .send();
    }

    const allowedRequestMethods = Object.keys(
      Object.fromEntries(
        Object.entries(allowedServiceMethodsOnRequestMethods).filter(
          ([key, allowedServiceMethods]) => {
            return allowedServiceMethods.includes(serviceMethod);
          }
        )
      )
    );

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

    return await serviceFunction(c);
  } catch (error) {
    return Response(c).error(error).send();
  }
});

export default servicesRoute;
