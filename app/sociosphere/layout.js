"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'
import axios from 'axios'

const Sociolayout = ({children}) => {

  const dispatch = useDispatch()
  

  useEffect(()=>{

    const fetchuser = async ()=>{
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/api/fetchuser`,
        {
          headers: {
            "Content-Type": "application/json",
            "socioToken": localStorage.getItem('socioToken')
          }
        }
      );

      if(data.success){
        dispatch(userAction(data.user))
      }
    }

    fetchuser()
 
  },[])
  

  return (
    <>
    <div className='Navbar w-full '>
      <div className='overlay w-full h-full absolute -z-10 bg-white bg-opacity-95'></div>
      <img className='w-full h-full object-cover absolute -z-20' src="/assets/images/mainbg.jpg" />
      <div className="navbar sticky top-0 p-5 z-30 lg:w-full w-full flex items-center justify-evenly lg:justify-between">
        <div className="logo flex items-center justify-center">
          <Image src='/assets/images/logo.png' width={40} height={40} alt='img'></Image>
          <h1 className='font-extrabold ml-2' >SOCIOSPHERE</h1>
        </div>
        <div>
            <input type="search" className='w-[350px] px-3 py-2 border border-gray-400 rounded-md bg-white text-sm' placeholder='Search...' />
        </div>
        <div>
          <Link href={'/auth/signup'}><button className='px-5 text-sm font-semibold py-2 bg-black text-white rounded-full'>LOGOUT</button></Link>
        </div>
      </div>
    </div>
    {children}
    </>
  )
}

export default Sociolayout
