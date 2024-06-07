"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormBlog from '@components/FormBlog';

const CreatePost= () => {
  const {data :session}=useSession();
  const [post,setPost]=useState({title:"",blog:""})
  const [submit,setSubmit]=useState(false);
  const router = useRouter();
  const createBlog = async (e) =>{
    e.preventDefault();
    setSubmit(true);
    try{
      const response = await fetch("/api/blog/new",{
        method: "POST",
        body: JSON.stringify({
          blog: post.blog,
          userId: session?.user.id,
          title: post.title,
        })
      });
      if(response.ok){
        router.push("/");
      }
    }
    catch(error){
      console.log(error);
    }
    finally{
      setSubmit(false);
    }
  }
  return (
    <FormBlog
    type='Create'
    post={post}
    setPost = {setPost}
    submitting ={submit}
    handleSubmit={createBlog}
    />
  );
};

export default CreatePost;