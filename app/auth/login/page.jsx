"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const [details, setDetails] = useState({username:"",password:""})

  const onChangeHandler = (e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }
  
  const handleLogin = async ()=>{
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`,{
      "username":details.username,
      "password":details.password
    })
    if(data.success){
      localStorage.setItem("socioToken", data.token)
      dispatch(userAction(data.user))
      router.push('/sociosphere/feed')
    }
    else{
      toast.error(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setDetails({username:"",password:""})
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/api/fetchuser`,
          {
            headers: {
              "Content-Type": "application/json",
              "socioToken": localStorage.getItem('socioToken')
            }
          }
        );
        if (data.success) {
          dispatch(userAction(data.user))
          router.push('/sociosphere/feed');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    checkUser();
  }, []);
  

  return (
    <div className='w-full h-[100vh] flex items-center flex-col justify-center'>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='overlay w-full h-full absolute -z-10 bg-white bg-opacity-95'></div>
      <img className='w-full h-full object-cover absolute -z-20' src="/assets/images/mainbg.jpg" />
      <div className="navbar fixed top-0 p-10 z-30 lg:w-[80vw] w-full flex items-center justify-evenly lg:justify-between">
        <div className="logo flex items-center justify-center">
          <Image src='/assets/images/logo.png' width={40} height={40} alt='img'></Image>
          <h1 className='font-extrabold ml-2' >SOCIOSPHERE</h1>
        </div>
        <div>
          <Link href={'/auth/signup'}><button className='px-5 text-sm font-semibold py-2 bg-black text-white rounded-full'>SIGN UP</button></Link>
        </div>
      </div>


        

          <div className=" bg-white flex flex-col  items-center justify-center  w-[600px] md:py-8 mt-8 md:mt-0  p-16 shadow-lg rounded-lg ">
        <h2 className='font-extrabold text-base mb-3 text-red-400'>LOGIN</h2>

            <div className="relative mb-4 w-full">
              <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
              <input   type="text" value={details.username} onChange={onChangeHandler} id="username" name="username" className="w-full text-sm bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>

            <div className="relative mb-4 w-full">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input  value={details.password} onChange={onChangeHandler}  type="password" id="password" name="password" className="w-full text-sm bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>


            <button onClick={handleLogin} disabled = {!details.username || !details.password ? true: false} className="text-white  w-full bg-red-400 disabled:bg-red-200 mt-3 border-0 py-2 px-6 focus:outline-none hover:bg-red-500 rounded text-lg">Login</button>

          <p className='mt-5'>or <Link href={'/auth/signup'}><span className='font-bold text-red-500'>SignUp</span></Link></p>
          </div>



        </div>
  )
}

export default Login
