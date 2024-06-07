import { connecttoDB } from "@utils/database";
import Blog from "@models/blog";

export const GET = async (req,{params})=>{
    try{
        await connecttoDB();
        const blogs = await Blog.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(blogs,{status:200}))
    }
    catch(error){
        return new Response("Failed to Fetch User Blogs",{status:500})
    }
}