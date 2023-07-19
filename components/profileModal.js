import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'

const ProfileModal = ({ isOpen, closeModal, user }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [details, setDetails] = useState({ username: user.username, about: user.about, image: "" })
  const [isLoading, setIsloading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState()

  const onChangeHandle = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const onChangeFile = (e) => {
    setImage(e.target.files[0])
  }

  const handleUpdate = async () => {
    setIsloading(true)
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default');


    if (image) {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dby0aqes3/image/upload',
        formData
      );

      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/editprofile`, {
        "image": response.data.url,
        "username": details.username,
        "about": details.about,
        "email": user.email
      })
    }
    else {
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}/api/editprofile`, {
        "username": details.username,
        "about": details.about,
        "email": user.email
      })
    }

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

    setIsloading(false)

    closeModal()
  };


  const checkUsernameAvailable = async () => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/getusers`, {
      "query": details.username
    })
    if (data.success) {
      if(data.user == user.username){
        setUsernameAvailable(true)
      }
      else{
        setUsernameAvailable(false)
      }
    }
    else {
      setUsernameAvailable(true)
    }
  }

  useEffect(() => {
    checkUsernameAvailable()
  }, [details.username])

  return (
    <div className={`shadow w-full min-h-screen ${isOpen ? "flex" : "hidden"} items-center justify-center fixed top-0 z-50 bg-white bg-opacity-50`}>
      <div className="modal p-7 w-[400px] flex flex-col relative items-center justify-center h-[550px] rounded-lg bg-white shadow-red-100 shadow-md">
        <i onClick={closeModal} class="ri-close-circle-fill absolute text-3xl cursor-pointer text-red-500 top-1 right-1"></i>
        <div className="circle w-[100px] h-[100px] overflow-hidden rounded-full border border-gray-300">
          <img src={user.image} className='w-full h-full object-cover' alt="" />
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          <label htmlFor="image" className='text-sm my-1 font-semibold text-gray-700'>Change Profile</label>
          <input type="file" id='image' name='image' onChange={onChangeFile} />
        </div>
        <div className='w-full mt-5 flex flex-col '>
          <label className='text-sm font-semibold text-red-500' htmlFor="username">Username</label>
          <input type="text" onChange={onChangeHandle} value={details.username} name='username' className={` ${!usernameAvailable ? "border-red-500" : "border-gray-300"  } border py-2 px-2 text-sm rounded-md border-gray-300' id='username`} />
          {
            !usernameAvailable && <span className='text-red-500 text-xs font-medium'>Not Available!</span>
          }
        </div>
        <div className='w-full mt-4 flex flex-col'>
          <label htmlFor="about" className='text-sm font-semibold text-red-500'>About</label>
          <textarea onChange={onChangeHandle} value={details.about} className='border resize-none rounded-md border-gray-300 p-2' name="about" id="about" cols="30" rows="6"></textarea>
        </div>
        <div>
          <button disabled={isLoading || !usernameAvailable ? true : false} onClick={handleUpdate} className='w-[100px] h-[40px] disabled:bg-red-100 flex items-center justify-center mt-4 py-2 rounded-full bg-red-500 text-white font-semibold text-md'>{isLoading ? <img className='w-[35px]' src='/assets/images/loader.gif' /> : "Update"}</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
