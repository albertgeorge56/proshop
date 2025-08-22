import mongoose, { Schema, model, Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  products?: any[]; // For virtual field
}

const groupSchema = new Schema<IGroup>(
  {
    name: {
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
groupSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "group",
});

// Cascade delete products on findOneAndDelete
groupSchema.pre("findOneAndDelete", async function (next) {
  const companyDoc = await this.model.findOne(this.getFilter());
  await mongoose.model("Product").deleteMany({ company: this.getFilter()._id });
  next();
});

// Cascade delete products on deleteOne
groupSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await mongoose.model("Product").deleteMany({ company: this._id });
    next();
  }
);

// Ensure virtuals are included in JSON and Object outputs
groupSchema.set("toObject", { virtuals: true });
groupSchema.set("toJSON", { virtuals: true });

const Group = model<IGroup>("Group", groupSchema);
export default Group;
