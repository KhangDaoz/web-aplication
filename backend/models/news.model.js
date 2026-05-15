import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
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
});

const News = mongoose.model("News", NewsSchema);

export default News;