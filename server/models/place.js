import mongoose from "mongoose";

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, requires: true },
  image: { type: String, requires: true },
  address: { type: String, requires: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export const Place = mongoose.model("Place", placeSchema);
