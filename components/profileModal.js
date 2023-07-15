import React, { useState } from 'react'
import axios from 'axios'

const ProfileModal = ({ isOpen, closeModal, user }) => {
  const [image, setImage] = useState(null)
  const [details, setDetails] = useState({ username: user.username, about: user.about, image: "" })

  const onChangeHandle = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const onChangeFile = (e)=>{
    setImage(e.target.files[0])
  }
  

  const handleUpdate = async () => {

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

    closeModal()
  };

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
          <input type="text" onChange={onChangeHandle} value={details.username} name='username' className='border py-2 px-2 text-sm rounded-md border-gray-300' id='username' />
        </div>
        <div className='w-full mt-4 flex flex-col'>
          <label htmlFor="about" className='text-sm font-semibold text-red-500'>About</label>
          <textarea onChange={onChangeHandle} value={details.about} className='border resize-none rounded-md border-gray-300 p-2' name="about" id="about" cols="30" rows="6"></textarea>
        </div>
        <div>
          <button onClick={handleUpdate} className='px-4 mt-4 py-2 rounded-full bg-red-500 text-white font-semibold text-md'>Update</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
