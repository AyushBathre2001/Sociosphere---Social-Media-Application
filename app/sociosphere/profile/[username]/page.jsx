"use client"
import PostModal from '@/components/postModal'
import ProfileModal from '@/components/profileModal'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = ({ params }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPost, setIsPost] = useState(false)
    const [fetch, setFetch] = useState(false)
    const [profile, setProfile] = useState({})
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [closeComment, setCloseComment] = useState(true)
    const [comment, setComment] = useState([])

    const closeModal = () => {
        setIsOpen(false)
        setIsPost(false)
    }



    const likePost = async (userId, postId) => {
        const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/post/like`, {
            userId, postId
        })
        setFetch(true)
    }

    const commentPost = async (userId, postId, comment) => {
        const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/post/comment`, {
            userId, postId, comment
        })
        setComment('')
        setFetch(true)
    }

    const requestSend = async (userId, friendId) => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/friends/sendrequest`, {
            userId, friendId
        })
        if(data.success){
            toast.success('Request has been sent.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }

    }

    useEffect(() => {
        if (fetch === true) {
            const fetchuser = async () => {
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
                }
            }

            fetchuser()
            setFetch(false)
        }

    }, [fetch])

    const onChange = (e) => {
        if (e.target.name === 'comment') {
            setComment(e.target.value)
        }
    }

    useEffect(() => {
        
            const fetchProfile = async () => {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_HOST}/api/fetchprofile`,
                    {
                        params: {
                            username: params.username
                        }
                    }
                );
    
                if (data.success) {
                    setProfile(data.user)
                }
            }
    
            fetchProfile()
        
       
    },[fetch])



    return (

        <div style={{ fontFamily: "gilroy" }} className='main overflow-scroll min-h-screen bg-white flex items-center justify-center w-full'>
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
                theme="dark"
            />
            {profile.username && <ProfileModal isOpen={isOpen} closeModal={closeModal} user={user} />}
            {profile.username && <PostModal isPost={isPost} closeModal={closeModal} user={user} />}
            <div className="box w-[80%]  bg-white  flex flex-col items-center justify-start min-h-screen p-10">
                <div className="profile  w-full flex items-center justify-evenly ">
                    <div className="circle overflow-hidden border-double border border-gray-300 w-[220px] h-[220px] bg-black rounded-full">
                        {profile.username && <img src={profile.image} className='w-full h-full object-cover' alt="" />}
                    </div>
                    <div className="about w-[60%] ">
                        <div className='text-2xl font-semibold text-gray-700'>
                            {profile.username && <span>{profile.posts.length} Posts</span>}
                            {profile.username && <span className='mx-4'>{profile.friends.length} Friends</span>}
                        </div>
                        {profile.username && <p className=' font-medium text-gray-700 my-3'>{profile.about}</p>}

                        {
                            profile.username == user.username ? <div> <button onClick={() => { setIsOpen(true) }} className='px-5 py-2 rounded-full bg-black text-white font-semibold'>Edit Profile</button> <button onClick={() => { setIsPost(true) }} className='px-5 mx-2 py-2 rounded-full bg-red-500 text-white font-semibold'>Create Post</button>  </div>
                                : <div> {
                                    profile.username && profile.friends.includes(user._id) ? <button className='px-5 py-2 rounded-full bg-green-600  text-white font-semibold'>Friends</button> :
                                     <button onClick={() => { requestSend(user._id, profile._id) }} className='px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold'>Send Request</button> } </div>
                        }

                    </div>
                </div>
                <div className='line h-[2px] w-[80%] mt-10 bg-gray-200'></div>
                <div className='posts  flex flex-col items-center justify-start w-full'>
                    <div className='flex text-md font-bold text-gray-600 p-6'>
                        <h2>All Posts</h2> <i class="ri-gallery-fill"></i>
                    </div>
                    <div className="all flex flex-wrap gap-4 w-full h-36 ">
                        {
                            profile.username && profile.posts.map((item) => {
                                return <div key={item._id} class="w-[30%] rounded relative overflow-hidden shadow-lg mt-8">
                                    <div className={`absolute w-full ${closeComment ? 'hidden' : ''} h-full bg-white bg-opacity-90`}>
                                        <i onClick={() => { setCloseComment(true) }} class="ri-close-circle-fill z-50 text-2xl absolute text-red-500 cursor-pointer top-1 right-1"></i>
                                        <i onClick={() => { commentPost(user._id, item._id, comment) }} class="ri-send-plane-fill z-50 text-2xl bottom-1 border rounded-lg p-1 cursor-pointer right-1 absolute"></i>
                                        <div className="up w-full h-[75%] p-5  overflow-scroll">
                                            {
                                                item.Comment.map((item) => {

                                                    return <div class="flex justify-center relative ">

                                                        <div class="relative grid grid-cols-1 gap-4 p-3 mb-2 w-full border rounded-lg bg-white shadow-lg">
                                                            <div class="relative flex gap-4">
                                                                <img src={item.userId.image} class="relative rounded-lg  bg-white border h-10 w-10" alt="" loading="lazy" />
                                                                <div class="flex flex-col w-full">
                                                                    <div class="flex flex-row justify-between">
                                                                        <p class="relative text-md font-bold text-gray-800 whitespace-nowrap truncate overflow-hidden">{item.userId.username}</p>
                                                                        <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                                                                    </div>
                                                                    <p class="text-gray-400 text-sm">20 April 2022, at 14:88 PM</p>
                                                                </div>
                                                            </div>
                                                            <p class=" text-sm font-semibold text-gray-700">{item.comment}</p>
                                                        </div>



                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className=" relative down w-full h-[25%]">
                                            <textarea onChange={onChange} value={comment} placeholder='Write your comment...' className='border resize-none border-gray-300 w-full h-full p-2' name="comment" id="comment" cols="30" ></textarea>
                                        </div>
                                    </div>
                                    <img class="w-full h-[300px]  object-cover" src={item.image} alt="Sunset in the mountains" />
                                    <div class="px-6 py-4">
                                        <p class="text-gray-700 text-base">
                                            {item.caption}
                                        </p>
                                    </div>
                                    <p className='text-xs px-3'>{item.like.length} Likes & {item.Comment.length} Comments</p>
                                    <div class=" w-full flex items-center justify-between font-bold   text-black">
                                        <button onClick={() => { likePost(user._id, item._id) }} className='w-[50%] hover:bg-gray-100 text-gray-800 text-sm flex items-center justify-center  cursor-pointer shadow-lg  p-2'>{item.like.includes(user._id) ? <> <p className='text-red-500'>Like</p> <i class="ri-heart-fill text-base text-red-500"></i> </> : <> <p>Like</p> <i class="ri-heart-line text-base"></i> </>}</button>
                                        <button onClick={() => { setCloseComment(false); commentPost('', item._id, '') }} className='w-[50%] hover:bg-gray-100 text-gray-800 text-sm flex items-center justify-center  cursor-pointer shadow-lg  p-2'>Comment<i class="ri-chat-4-fill text-base"></i></button>
                                    </div>
                                </div>
                            })
                        }

                        {profile.username && user.friends.length < 1 && <div className='flex w-full items-center justify-center p-10 text-semibold text-sm text-gray-500'><p>Not uploaded yet.</p></div>}

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Profile
