import Blog from "@models/blog";
import { connecttoDB } from "@utils/database";

export const GET = async(req,{params})=>{
    try{
        await connecttoDB();

        const blog = await Blog.findById(params.id).populate("creator")
        if(!blog) return new Response("Blog Not Found",{status:404});
        return new Response(JSON.stringify(blog),{status:200})
    }
    catch(error){
        return new Response("Internal Server Error",{status:500})
    }
}
export const PATCH = async(req,{params})=>{
    const {blog,title}=await req.json();
    try{
        await connecttoDB();
        const existBlog= await Blog.findById(params.id);
        if(!existBlog) return new Response("Blog not Found",{status:404});
        existBlog.blog=blog;
        existBlog.title=title;
        await existBlog.save();

        return new Response("Successfully Updated",{status:200});
    }
    catch(error){
        return new Response("Error in Updating the Blog",{status:500});
    }
};
export const DELETE = async(req,{params})=>{
    try{
        await connecttoDB();
        await Blog.findByIdAndDelete(params.id);
        return new Reponse("Blog Deleted Successfully",{status:200})
    }
    catch(error){
        return new Response("Error in Deleting the Blog",{status:500});
    }
}