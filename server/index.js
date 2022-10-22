import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { default as placesRoutes } from "./routes/places-routes.js";
import { default as usersRoutes } from "./routes/users-routes.js";
import HttpError from "./models/http-error.js";

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unkown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://Bartosz:xBFSiwNaq4HGnpy6@cluster0.aqlwcqf.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening on port 5000 and database connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
