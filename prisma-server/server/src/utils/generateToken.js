import jwt from "jsonwebtoken";

const generateToken = (userId, exp = "7 days") => {
  return jwt.sign({ userId }, "secret", { expiresIn: exp });
};

export { generateToken as default };
