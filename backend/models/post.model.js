import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"]
    },
    text: {
        type: String,
        required: [true, "Please provide comment text"]
    }
})

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
    },
    comments: [CommentSchema]
})

const Post = mongoose.model("Post", PostSchema);

export default Post;