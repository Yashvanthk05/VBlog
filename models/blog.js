import { Schema,model,models } from "mongoose";
const BlogSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    blog: {
        type:String,
        required:[true,'Blog is required.'],
    },
    title:{
        type: String,
        required: [true,'Title is required.']
    }
})
const Blog = models.Blog || model('Blog',BlogSchema);

export default Blog;