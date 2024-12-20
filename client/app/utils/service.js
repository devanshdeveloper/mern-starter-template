import axios from "axios";
import {
  BACKEND_URL,
  isDevelopmentEnvironment,
  MOCK_API,
} from "../constants/env";
import { ls } from "./ls";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    ls.item("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    ls.remove("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

setAuthToken(ls.item("token"));

export default async function service({ url, method, mock }, options, ...rest) {
  if (mock && MOCK_API) {
    return mock;
  }

  const response = await axiosInstance?.[method?.toLowerCase()]?.(
    url,
    options,
    ...rest
  );
  // isDevelopmentEnvironment() &&
  console.log({ url, method, response, options, rest });
  return response;
}
