import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, "Please provide slug"],
        unique: [true, "Slug Exists"]
    },
    title: {
        type: String,
        required: [true, "Please provide title"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    }
})

const Post = mongoose.model("Post", PostSchema);

export default Post;