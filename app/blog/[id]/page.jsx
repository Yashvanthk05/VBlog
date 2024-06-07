"use client"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'

const Blog = () => {
    const [blog,setBlog]=useState([]);
    const pathName=usePathname();
    useEffect(()=>{
        const fetchPost = async()=>{
            const response = await fetch(`/api${pathName}`)
            const data = await response.json();
            setBlog(data);
        }
        fetchPost();
    },[])
  return (
    <div className='blogdisplay'>
    <div className="bcard">
        <div className="bcardh">
            <span className="cardh">{blog.title}</span>
        </div>
        <div className="bcardcontent">
          <span className="bcardcon">
            {blog.blog}
          </span>
        </div>
    </div>
    </div>
  )
}

export default Blog