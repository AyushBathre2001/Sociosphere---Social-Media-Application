"use client"
import ProfileModal from '@/components/profileModal'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [isOpen,setIsOpen] = useState(false)

    const closeModal = ()=>{
        setIsOpen(false)
    }

    const user = useSelector((state)=>state.user)

    console.log(user)
    return (
            
           <div style={{ fontFamily: "gilroy" }} className='main overflow-scroll min-h-screen bg-white flex items-center justify-center w-full'>
            {user.user && <ProfileModal isOpen={isOpen} closeModal={closeModal} user={user.user}/>}
        <div className="box w-[80%]  bg-white  flex flex-col items-center justify-start min-h-screen p-10">
            <div className="profile  w-full flex items-center justify-evenly ">
                <div className="circle overflow-hidden border-double border border-gray-300 w-[220px] h-[220px] bg-black rounded-full">
                   {user.user && <img src={user.user.image} className='w-full h-full object-cover' alt="" /> }
                </div>
                <div className="about w-[60%] ">
                    <div className='text-2xl font-semibold text-gray-700'>
                        <span>{user.user && user.user.posts.length} Posts</span>
                        <span className='mx-4'>{user.user && user.user.friends.length} Friends</span>
                    </div>
                    {user.user && <p className=' font-medium text-gray-700 my-3'>{user.user.about}</p>}
                    <div>
                        <button onClick={()=>{setIsOpen(true)}} className='px-5 py-2 rounded-full bg-black text-white font-semibold'>Edit Profile</button>
                        <button className='px-5 mx-2 py-2 rounded-full bg-red-500 text-white font-semibold'>Create Post</button>
                    </div>
                </div>
            </div>
            <div className='line h-[2px] w-[80%] mt-10 bg-gray-200'></div>
            <div className='posts  flex flex-col items-center justify-start w-full'>
                <div className='flex text-md font-bold text-gray-600 p-6'>
                    <h2>All Posts</h2> <i class="ri-gallery-fill"></i>
                </div>
                <div className="all flex flex-wrap gap-4 w-full h-36 ">
                    {
                        user.user && user.user.friends.map(()=>{
                            return  <div key={user.user._id} class="max-w-[30%] rounded overflow-hidden  shadow-lg mt-8">
                            <img class="w-full h-[300px]  object-cover" src="/assets/images/model.jpg" alt="Sunset in the mountains" />
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                                <p class="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                </p>
                            </div>
                            <div class="px-6 w-full flex items-center justify-between font-bold pt-4 pb-2 text-black">
                                <div className='w-[50%] flex items-center justify-center cursor-pointer shadow-lg  p-2'>Like <i class="ri-heart-line text-xl"></i></div>
                                <div className='w-[50%] flex items-center justify-center cursor-pointer shadow-lg  p-2'>Comment<i class="ri-chat-4-fill text-xl"></i></div>
                            </div>
                        </div>
                        })
                    }

                    {user.user && user.user.friends.length<1 && <div className='flex w-full items-center justify-center p-10 text-semibold text-sm text-gray-500'><p>Not uploaded yet.</p></div>}
                   
                   
                </div>
            </div>
        </div>
    </div> 
       
       
    )
}

export default Profile
