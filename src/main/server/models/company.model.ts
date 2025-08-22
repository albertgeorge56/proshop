import mongoose, { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  shortname: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products?: any[]; // Add this for type safety if you want
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    shortname: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual populate for products
companySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "company",
});

// Cascade delete products on findOneAndDelete
companySchema.pre("findOneAndDelete", async function (next) {
  await mongoose.model("Product").deleteMany({ company: this.getFilter()._id });
  next();
});

// Cascade delete products on deleteOne
companySchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await mongoose.model("Product").deleteMany({ company: this._id });
    next();
  }
);

// Ensure virtuals are included in JSON and Object outputs
companySchema.set("toObject", { virtuals: true });
companySchema.set("toJSON", { virtuals: true });

const Company = model<ICompany>("Company", companySchema);
export default Company;
