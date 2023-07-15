"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { space } from 'postcss/lib/list'

const Signup = () => {
  const [otp, setOtp] = useState({ code: "", isSent: false, isValid: false })
  const [details, setDetails] = useState({ email: "", code: "", username: "", password: "" })
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState()
  const router = useRouter();

  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    const isValidPassword = regex.test(details.password);
    setIsValidPassword(isValidPassword);
  };

  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValidEmail = emailRegex.test(details.email);
    setIsValidEmail(isValidEmail);
  };

  useEffect(() => {
    validatePassword()
  }, [details.password])

  useEffect(() => {
    validateEmail()
  }, [details.email])


  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })

  }

  const checkUsernameAvailable = async ()=>{
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getusers`,{
        "query":details.username
      })
      if(data.success){
        setUsernameAvailable(false)
      }
      else{
        setUsernameAvailable(true)
      }
  }

  useEffect(()=>{
    checkUsernameAvailable()
  },[details.username])

  const verifyEmail = async () => {
    setisLoading(true)
    var randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/sendmail`, {
      email: details.email,
      validationCode: randomNumber
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!data.success) {
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
    }
    else {
      toast.success('Please check your mail!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOtp({ ...otp, isSent: true, code:randomNumber })
    }

    setisLoading(false)

  }

  const checkOtp = () => {
 

    if (details.code == otp.code) {
      setOtp({ ...otp, isValid: true })
    }
    else {
      toast.error('Invalid Verification Code!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const handleSignUp = async () => {
    if (isValidPassword) {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        "username": details.username,
        "email": details.email,
        "password": details.password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (data.success) {
        router.push('/auth/login')
      }
      else {
        toast.error('Something went wrong!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }


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
          <Link href={'/auth/login'}><button className='px-5 text-sm font-semibold py-2 bg-black text-white rounded-full'>LOGIN</button></Link>
        </div>
      </div>

      <div className="box rounded-lg mt-16 w-[70%] h-[70vh] flex shadow-xl ">
        <div className="left rounded-lg  flex flex-col items-center justify-center p-8 h-full w-[60%] bg-white">
        <h2 className='font-extrabold text-base mb-3 text-red-400'>SIGN UP</h2>

        {
        otp.isValid ? <div className=" bg-white rounded-lg flex flex-col h-full items-center justify-center  w-full md:py-8 mt-8 md:mt-0  p-10 ">

          <div className="relative mb-5 w-full">
            <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
            <input onChange={onChangeHandler} value={details.username} type="text" id="username" name="username" className={`w-full ${!usernameAvailable ? "border-red-500" : "border-gray-300"  }  bg-white rounded border  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />
            <div className='w-full h-[2px]'>
            {
              !usernameAvailable  && <span className='text-red-500 text-xs font-medium'>Not Available!</span> 
            }
            </div>
          
          </div>

          <div className="relative mb-4 w-full">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input onChange={onChangeHandler} value={details.password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <span className='text-sm text-gray-600'>Password should having a minimum length of 8 characters, at least one uppercase letter, one lowercase letter, one numeric digit, and one special character</span>
          </div>


          <button disabled={!details.username || !isValidPassword || !usernameAvailable ? true : false} onClick={handleSignUp} className="text-white w-full bg-red-400 disabled:bg-red-200 mt-3 border-0 py-2 px-6 focus:outline-none hover:bg-red-500 rounded text-lg">Signup</button>

        </div> : <div className=" bg-white rounded-lg flex flex-col h-full items-center justify-center  w-full md:py-8 mt-8 md:mt-0  p-10 ">

          <div className="relative mb-4 w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input readOnly={otp.isSent ? true : false} onChange={onChangeHandler} value={details.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

          {
            otp.isSent && <div className="relative mb-4 w-full">
              <label htmlFor="code" className="leading-7 text-sm text-gray-600">Verification code*</label>
              <input onChange={onChangeHandler} value={details.code} type="text" id="code" name="code" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          }


          {isLoading ? <div className='w-full flex items-center justify-center p-4'><Image width={40} height={40} src="/assets/images/loader.gif" alt="" /></div>
            :


            !otp.isSent ? <button disabled={!isValidEmail ? true : false} onClick={() => { verifyEmail() }} className="text-white bg-red-400  disabled:bg-red-200 w-full border-0 py-2 px-6 focus:outline-none hover:bg-red-500 rounded text-lg">Continue</button> : <button onClick={checkOtp} className="text-white w-full bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Verify</button>




          }
          <p className="text-xs text-gray-500 mt-3">Verification code will be sent to your email.</p>
        </div>

        
      }
            <p className='mt-5'>or <Link href={'/auth/login'}><span className='font-bold text-red-500'>Login</span></Link></p>

        </div>
        <div className="right rounded-lg w-[40%] h-full">
          <img className='w-full h-full rounded-lg object-cover' src="/assets/images/model.jpg" alt="" />
        </div>
      </div>

     


    </div>
  )
}

export default Signup
