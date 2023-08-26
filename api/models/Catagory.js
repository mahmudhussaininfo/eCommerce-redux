import mongoose from "mongoose";

// schema
const catagorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    parentCatagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      default: null,
    },
    subCatagory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Catagory",
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export model
export default mongoose.model("Catagory", catagorySchema);
