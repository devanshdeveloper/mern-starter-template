import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constansts/env";

class JwtUtils {
  constructor(secretKey, options = {}) {
    this.secretKey = secretKey;
    this.options = options;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, this.options);
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

const jwtUtils = new JwtUtils(JWT_SECRET, {
  expiresIn: "24h",
});

export default jwtUtils;
