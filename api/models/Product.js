import mongoose, { Mongoose } from "mongoose";

// schema
const productSchema = mongoose.Schema(
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
    productType: {
      type: String,
      enum: ["Simple", "Variable", "Group", "External"],
      default: "Simple",
    },
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    spacification: {
      type: String,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      default: null,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Catagory",
      //   required: true,
    },
    brands: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    productSimple: {
      regularPrice: {
        type: Number,
        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      productPhotos: {
        type: [String],
        // required: true,
      },
      stock: {
        type: Number,
        default: 0,
      },
    },
    productVariable: [
      {
        regularPrice: {
          type: Number,
          //   required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        size: {
          type: String,
          default: null,
        },
        colors: {
          type: String,
          default: null,
        },
        productPhotos: {
          type: [String],
          //   required: true,
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    productGroup: [
      {
        name: {
          type: String,
          //   required: true,
        },
        regularPrice: {
          type: Number,
          //   required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },
        size: {
          type: String,
          default: null,
        },
        colors: {
          type: String,
          default: null,
        },
        productPhotos: {
          type: [String],
          //   required: true,
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    productExternal: {
      regularPrice: {
        type: Number,
        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },
      productPhotos: {
        type: [String],
        // required: true,
      },
      stock: {
        type: Number,
        default: 0,
      },
      productLink: {
        type: String,
        // required: true,
      },
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
export default mongoose.model("Product", productSchema);
