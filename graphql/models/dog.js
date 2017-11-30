import mongoose from "mongoose";

const DogSchema = new mongoose.Schema(
  {
    breed: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: null },
  },
  { versionKey: "v" },
);
const Dogs = mongoose.model("Dog", DogSchema);

export default Dogs;
