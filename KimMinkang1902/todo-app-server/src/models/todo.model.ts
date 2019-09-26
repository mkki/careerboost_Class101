import mongoose, { Schema, Document } from "mongoose";
import { IFolder } from "./folder.model";

export interface ITodo extends Document {
  text: string;
  stat: string;
  folderId: IFolder;
}

const todoSchema: Schema = new Schema({
  text: String,
  stat: {
    type: String,
    default: "active"
  },
  folderId: {
    type: Schema.Types.ObjectId,
    ref: "Folder"
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

todoSchema.set("toObject", { getters: true, virtuals: true });

export default mongoose.model<ITodo>("Todo", todoSchema);
