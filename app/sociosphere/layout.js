"use client"


import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Provider, useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { useSelector } from 'react-redux'



const Sociolayout = ({children}) => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const [query,setQuery] = useState('')
  const [users,setUsers] = useState([])
  const [sBox,setsBox]  = useState(false)
  const user = useSelector((state)=>state.user)

  useEffect(()=>{
    document.addEventListener('click',()=>{
      setsBox(false)
    })
  })

  

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


  const handleLogout = ()=>{
    localStorage.removeItem('socioToken')
    router.push('/')
  }

  const onChange = (e)=>{
    if(e.target.name == "query"){
      setQuery(e.target.value)
    }
  }


  const searchUsers = async ()=>{
    if(query.trim().length>0){
      setsBox(true)
      const {data} =  await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/search`,{
        params:{
          "q":query
        }
      })
      if(data.success){
        setUsers(data.users)
      }
    }
    else{
      setsBox(false)
      setUsers([])
    }
   
  }

  useEffect(()=>{
    searchUsers()
  },[query])
  
  return (
    <>
    <Head>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet"></link>

    </Head>
    <div className='Navbar w-full '>
      <div className='overlay w-full h-full absolute -z-10 bg-white bg-opacity-95'></div>
      <img className='w-full h-full object-cover absolute -z-20' src="/assets/images/mainbg.jpg" />
      <div className="navbar sticky top-0 p-5 z-30 lg:w-full w-full flex items-center justify-evenly lg:justify-between">
        <div className="logo flex items-center justify-center">
          <Image src='/assets/images/logo.png' width={40} height={40} alt='img'></Image>
          <h1 className='font-extrabold ml-2' >SOCIOSPHERE</h1>
        </div>
        <div className='relative'>
            <input onChange={onChange} name='query' id='query' value={query} type="text" className='w-[350px] px-3 py-2 border border-gray-400 rounded-md bg-white text-sm' placeholder='Search...' />
            <div className={`absolute -bottom-100 w-[350px] p-3 ${sBox ? '' : 'hidden'}  bg-white shadow-lg h-72 overflow-auto rounded-md`}>
              { users && users.map((user)=>{
                return  <div key={user._id} class="flex justify-center cursor-pointer relative ">
                                                
                <div class="relative grid grid-cols-1 gap-4 p-3 mb-2 w-full border rounded-lg bg-white shadow-lg">
                    <div class="relative flex gap-4">
                        <img src={user.image} class="relative rounded-lg  bg-white border h-10 w-10" alt="" loading="lazy"/>
                        <div class="flex flex-col w-full">
                            <div class="flex flex-row justify-between">
                                <p class="relative text-md font-bold text-gray-800 whitespace-nowrap truncate overflow-hidden">{user.username}</p>
                                <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                            </div>
                            <p class="text-gray-400 text-sm">{user.email}</p>
                        </div>
                    </div>
                </div>
                
                </div>
              })}
            </div>
        </div>
        <div className='flex'>
          <div className='text-xl relative rounded-full cursor-pointer bg-red-500 mr-3 w-[35px] h-[35px] flex items-center justify-center text-white'>
          <i class="ri-user-add-fill"></i>
          <div className='w-[18px] absolute h-[18px] rounded-full flex items-center text-xs -top-1 -right-1 justify-center bg-black'>0</div>
          </div>
          <button onClick={handleLogout} className='px-5 text-sm font-semibold py-2 bg-black text-white rounded-full'>LOGOUT</button>
        </div>
      </div>
    </div>
    {children}
    </>
  )
}

export default Sociolayout
