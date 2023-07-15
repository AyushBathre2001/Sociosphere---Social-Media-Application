import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'


const Home = () => {

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <div className='overlay w-full h-full absolute -z-10 bg-white bg-opacity-90'></div>
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

       
      <div className="txtbox z-30 lg:w-[60vw] w-[90vw] flex flex-col items-center justify-center">
        <h1 className='lg:text-6xl md:text-6xl text-4xl font-bold'>SOCIOSPHERE</h1>
        <h2 style={{"font-family": 'Dancing Script'}} className='lg:text-xl text-xl text-red-500 font-semibold'>Ride the Wave of Social Engagement</h2>
        <p className='text-center text-sm mt-2  ' >SocioSphere is a revolutionary social media application designed to seamlessly connect you with people from all walks of life. Whether you're looking to expand your professional network, meet like-minded individuals, or simply stay in touch with friends and family, SocioSphere has you covered.</p>
        <Link href={'/auth/signup'}><button className='px-5 mt-3 text-sm font-semibold py-2 bg-black text-white rounded-full'>Get Started</button></Link>
      </div>
      <img className='absolute w-[60vw] z-20 lg:-bottom-36 -bottom-10 opacity-80' src='/assets/images/bottom.png'/>
    </div>
  )
}

export default Home
