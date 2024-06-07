"use client"
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

const MyProfile = () => {
  const router = useRouter();
    const {data:session}=useSession();
    const[posts,setPosts]=useState([]);
    const handleEdit= (post)=>{
      router.push(`/update-blog?id=${post._id}`)
    }
    const handleDelete= async (post)=>{
      const isConfirm= confirm("Dear VBlogger, Are you Sure you want to delete this blog");

        if(isConfirm){
          try{
            await fetch(`api/blog/${post._id.toString()}`,{
              method: 'DELETE',
            })
            const filteredPosts = posts.filter((p)=> p._id !== post._id)
            setPosts(filteredPosts)
          }
          catch(error){
            console.log(error)
          }
        }

    }
    useEffect(()=>{
        const fetchPosts = async () =>{
            const res = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await res.json();
            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    },[])
  return (
    <Profile data={posts} handleEdit={handleEdit} handleDelete={handleDelete} name={session?.user.name.toUpperCase}/>
  )
}

export default MyProfile