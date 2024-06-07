"use client"
import { useEffect, useState } from 'react';
import Feed from './../components/Feed';
import { useSession } from 'next-auth/react';


const Home = () => {
  const {data:session}=useSession();
  const [greet,setGreet]=useState("Morning")
  useEffect(()=>{
    const timeInterval= setInterval(()=>{
      const time = new Date();
      if(time.getHours()>=12 && time.getHours()<=17){
        setGreet("Good Afternoon🌇");
      }
      else if(time.getHours()>=17 && time.getHours()<24){
        setGreet("Good Evening🌙");
      }
      else{
        setGreet("Good Morning🌞");
      }
    },1000)
    return ()=>clearInterval(timeInterval);
  },[])
  return (
    <section className="home_style">
      <div className="content">
        <span className="head_style">{greet},</span>
        <span className="head_style">Welcome {session?.user?session?.user.name:"Blogger"}</span>
        <span className="headcon_style" style={{textAlign:"center"}}>Engage. Share. Thrive.</span>
      </div>
      <Feed />
    </section>
  )
}

export default Home