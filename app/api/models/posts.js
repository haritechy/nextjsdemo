import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Address:{ type: String, required:true },
    Phno:{     type:String,require:true}
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
