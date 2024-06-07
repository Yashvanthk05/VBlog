import {connecttoDB} from "@utils/database";
import Blog from "@models/blog";

export const GET = async (req) =>{
    try{
        await connecttoDB();
        const blogs= await Blog.find({}).populate('creator');

        return new Response(JSON.stringify(blogs),{status:200})
    }
    catch(error){
        return new Response("Failed to Fetch All Blogs",{status:500})
    }
}