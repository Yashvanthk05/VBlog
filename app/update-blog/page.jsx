"use client"
import FormBlog from "@components/FormBlog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateBlog = () => {
    const router=useRouter();
    const [submit,setSubmit]=useState(false);
    const searchParams = useSearchParams();
    const blogId=searchParams.get('id');
    const [post,setPost] = useState({
        blog:'',
        title:''
    })
    useEffect(()=>{
        const getBlogDetails = async () =>{
            const res = await fetch(`api/blog/${blogId}`);
            const data= await res.json();
            setPost({
                blog: data.blog,
                title: data.title,
            })
        }
        
        if(blogId) getBlogDetails();
    },[blogId])
    
    const updateBlog= async (e) =>{
        e.preventDefault();
        setSubmit(true);
        if(!blogId){
            return alert('Blog ID not Found')
        }
        try{
            const response = await fetch(`api/blog/${blogId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    blog: post.blog,
                    title: post.title
                })
            })
            if(response.ok){
                router.push('/')
            }

        }
        catch(error){
            console.log(error)
        }
        finally{
            setSubmit(false)
        }
    }
    
  return (
    <FormBlog 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submit}
        handleSubmit={updateBlog}
    />
  )
}
const UpdateBlogPage = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <UpdateBlog />
  </Suspense>
);
export default UpdateBlog
