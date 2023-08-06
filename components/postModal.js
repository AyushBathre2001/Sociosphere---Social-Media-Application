import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAction } from '@/redux/actions/userAction'

const PostModal = ({ isPost, closeModal,user }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const onChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0])
    }
    else if (e.target.name === "caption") {
      setCaption(e.target.value)
    }
  }

  const handleUpload = async () => {
    setIsloading(true)
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dby0aqes3/image/upload',
      formData
    );

    const post = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/post/createpost`, {
      "image": response.data.url,
      "user": user._id,
      "caption": caption,
    })
    
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
}


return (
  <div className={`shadow w-full min-h-screen ${isPost ? "flex" : "hidden"} items-center justify-center fixed top-0 z-50 bg-white bg-opacity-50`}>
    <div className="modal p-7 w-[50%] flex relative items-center justify-center h-[350px] rounded-lg bg-white shadow-red-100 shadow-md">
      <i onClick={closeModal} class="ri-close-circle-fill absolute text-3xl cursor-pointer text-red-500 top-1 right-1"></i>

      <div className='flex flex-col items-center justify-center w-full'>
        <p className='text-md font-semibold '>Select Image</p>
        <input  onChange={onChange}  type="file" id='image' name='image' />
      </div>
      <div>

        <div className='w-full mt-4 flex flex-col'>
          <label htmlFor="caption" className='text-sm font-semibold text-red-500'>Caption</label>
          <textarea value={caption} onChange={onChange} className='border resize-none rounded-md border-gray-300 p-2' name="caption" id="caption" cols="35" rows="8"></textarea>
        </div>
        <div>
          <button onClick={handleUpload} className='w-[100px] h-[40px] disabled:bg-red-100 flex items-center justify-center mt-4 py-2 rounded-full bg-red-500 text-white font-semibold text-md'>Upload</button>
        </div>
      </div>
    </div>
  </div>
)
}

export default PostModal
