"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async ()=>{
      const res = await getProviders();
      setProviders(res);
    }
    setUpProviders();
  },[]);

  return (
    <nav className='nav'>
        <Link href="/" className='flex flex-row flex-center gap-4'>
            <Image src="/assets/logo.png" height={100} width={100} alt="Icon" className='logo_style'></Image>
            <span className='logo_txt'>VBlog</span>
        </Link>
        <div className='sm:flex hidden'>
            {session?.user?(
                <div className='signcon'>
                    <Link href="/create-post" className='create_style'>Create Blog</Link>
                    <button className='sign_style' onClick={signOut}>Sign Out</button>
                    <Link href='/profile'><Image src={session?.user.image} height={50} width={50} className='usericon'/>
                    </Link>
                </div>
            ):(
                <>
                {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='sign_style'
                >
                  Sign in
                </button>
              ))}
                </>
            )}
        </div>
        <div className='sm:hidden flex relative'>
            {session?.user?(
                <div className="user">
                    <Image src={session?.user.image} height={35} width={35} alt='User Icon' onClick={()=>setToggleDropdown(prev=>!prev)} className='usericon'/>
                    {toggleDropdown && 
                    <div className="dropdown">
                        <Link href="/profile" className='profile_style' onClick={()=>setToggleDropdown(prev=>!prev)} >
                        Profile
                        </Link>
                        <Link href="/create-post" className='create_style' onClick={()=>setToggleDropdown(prev=>!prev)} >Create Post</Link>
                        <button className='sign_style' onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }} >Sign Out</button>
                    </div>
                    }
                </div>
            ):(
                <>
                {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='sign_style'
                >
                  Sign in
                </button>
              ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav;