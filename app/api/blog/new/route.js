import { connecttoDB } from "@utils/database";
import Blog from '@models/blog'
export const POST =async (req)=>{
    const {userId,blog,title}=await req.json();
    try{
        await connecttoDB();
        const newBlog = new Blog({
            creator: userId,
            title,
            blog
        })
        await newBlog.save();

        return new Response(JSON.stringify(newBlog),{status:201})
    }catch(error){
        return new Repsonse("Failed to create a new prompt",{status:500})
    }
}