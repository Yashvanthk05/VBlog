"use client"
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname,useRouter } from "next/navigation"


const BlogCard = ({post,handleEdit,handleDelete}) => {
  const {data:session}=useSession()
  const pathName=usePathname();
  const blogID=post._id;
  const router=useRouter();
  const handleTagClick=()=>{
    router.push(`/blog/${blogID}`)
  }
  return (
    <div className="blog_card" >
        <div className="card_head" onClick={()=>handleTagClick()}>
            <span className="cardh">{(post.title.length>20)?`${post.title.slice(0,20)}...`:post.title}</span>
        </div>
        <div className="card_content">
          <span className="cardcon">
            {post.blog.length>50 ? `${post.blog.slice(0,50)}....\nTap to Read More` : post.blog}
          </span>
        </div>
        <div className="card_bottom">
          <Image src={post.creator.image} height={35} width={35} className="usericon"/>
          <span className="cardu">{post.creator.username}</span>
        </div>
        {session?.user.id === post.creator._id && pathName==='/profile' && (
          <div className="profbtns">
            <button className="edit_style" onClick={handleEdit}>Edit</button>
            <button className="delete_style" onClick={handleDelete}>Delete</button>
          </div>
        )}
    </div>
  )
}

export default BlogCard