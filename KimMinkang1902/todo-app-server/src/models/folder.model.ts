import mongoose, { Schema, Document } from "mongoose";

export interface IFolder extends Document {
  title: string;
  updatedAt: Date;
}

const folderSchema: Schema = new Schema({
  title: String,
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

folderSchema.pre("remove", function(next) {
  this.model("Todo").remove({ folderId: this._id }, next);
});

folderSchema.set("toObject", { getters: true, virtuals: true });

export default mongoose.model<IFolder>("Folder", folderSchema);
