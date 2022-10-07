import express from "express";
import bodyParser from "body-parser";

import { default as placesRoutes } from "./routes/places-routes.js";
import { default as usersRoutes } from "./routes/users-routes.js";
import HttpError from "./models/http-error.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unkown error occurred!" });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
