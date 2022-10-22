import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import { User } from "../models/user.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
};

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }

  console.log(req.file)

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing Up failed, please try again.", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  res.json({
    message: "Logged in.",
    user: existingUser.toObject({ getters: true }),
  });
};
