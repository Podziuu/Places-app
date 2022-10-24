import jwt from "jsonwebtoken";

import HttpError from "../models/http-error.js";

export const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(new Error("Authentication failed!"));
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 403));
  }
};

export default checkAuth;
