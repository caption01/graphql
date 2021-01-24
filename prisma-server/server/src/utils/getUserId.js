import jwt from "jsonwebtoken";

const getUserId = (req, reqAuth = true) => {
  const header = req.request
    ? req.request.headers.authorization
    : req.connection.context.Authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    return decoded.userId;
  }

  if (reqAuth) {
    throw new "Authentication require"();
  }

  return null;
};

export { getUserId as default };
