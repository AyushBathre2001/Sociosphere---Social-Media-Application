"use client"
import PostModal from '@/components/postModal'
import ProfileModal from '@/components/profileModal'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'

const Profile = () => {
    const [isOpen,setIsOpen] = useState(false)
    const [isPost,setIsPost] = useState(false)
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const closeModal = ()=>{
        setIsOpen(false)
        setIsPost(false)
    }

    const likePost = async (userId,postId)=>{
        const {data} = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/post/like`,{
            userId,postId
        })
    }

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
     
      },[likePost])

    return (
            
           <div style={{ fontFamily: "gilroy" }} className='main overflow-scroll min-h-screen bg-white flex items-center justify-center w-full'>
            {user.username && <ProfileModal isOpen={isOpen} closeModal={closeModal} user={user}/>}
            {user.username && <PostModal isPost={isPost} closeModal={closeModal} user={user}/>}
        <div className="box w-[80%]  bg-white  flex flex-col items-center justify-start min-h-screen p-10">
            <div className="profile  w-full flex items-center justify-evenly ">
                <div className="circle overflow-hidden border-double border border-gray-300 w-[220px] h-[220px] bg-black rounded-full">
                   {user.username && <img src={user.image} className='w-full h-full object-cover' alt="" /> }
                </div>
                <div className="about w-[60%] ">
                    <div className='text-2xl font-semibold text-gray-700'>
                        {user.username && <span>{user.posts.length} Posts</span>}
                        {user.username && <span className='mx-4'>{user.friends.length} Friends</span>}
                    </div>
                    {user.username && <p className=' font-medium text-gray-700 my-3'>{user.about}</p>}
                    <div>
                        <button onClick={()=>{setIsOpen(true)}} className='px-5 py-2 rounded-full bg-black text-white font-semibold'>Edit Profile</button>
                        <button onClick={()=>{setIsPost(true)}} className='px-5 mx-2 py-2 rounded-full bg-red-500 text-white font-semibold'>Create Post</button>
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
                        user.username && user.posts.map((item)=>{
                            return  <div key={item._id} class="w-[30%] rounded overflow-hidden shadow-lg mt-8">
                            <img class="w-full h-[300px]  object-cover" src={item.image} alt="Sunset in the mountains" />
                            <div class="px-6 py-4">
                                <p class="text-gray-700 text-base">
                                    {item.caption}
                                </p>
                            </div>
                            <p className='text-xs px-3'>{item.like.length} Likes & {item.Comment.length} Comments</p>
                            <div class=" w-full flex items-center justify-between font-bold   text-black">
                                <button  onClick={()=>{likePost(user._id,item._id)}} className='w-[50%] hover:bg-gray-100 text-gray-800 text-sm flex items-center justify-center  cursor-pointer shadow-lg  p-2'>{item.like.includes(user._id) ? <> <p className='text-red-500'>Like</p> <i class="ri-heart-fill text-base text-red-500"></i> </> : <> <p>Like</p> <i class="ri-heart-line text-base"></i> </> }</button>
                                <button className='w-[50%] text-gray-800 text-sm flex items-center justify-center  cursor-pointer shadow-lg  p-2'>Comment<i class="ri-chat-4-fill text-base"></i></button>
                            </div>
                        </div>
                        })
                    }

                    {user.username && user.friends.length<1 && <div className='flex w-full items-center justify-center p-10 text-semibold text-sm text-gray-500'><p>Not uploaded yet.</p></div>}   
                   
                </div>
            </div>
        </div>
    </div> 
       
       
    )
}

export default Profile
