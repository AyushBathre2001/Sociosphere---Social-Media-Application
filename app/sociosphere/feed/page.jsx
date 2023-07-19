"use client"
import Link from "next/link"
import {useSelector} from 'react-redux'
const Feed = () => {

  const user = useSelector((state)=>state.user)
  
  return (
    <div className='main min-h-screen  items-start justify-evenly flex z-50'>
      <section className='h-[50vh] flex flex-col items-center justify-center p-4 w-[20vw] bg-white rounded-lg shadow-md'>
        <div className="circle w-[100px] overflow-hidden h-[100px] rounded-full border border-gray-300">
        {user.username && <img src={user.image} className='w-full h-full object-cover' alt="" />}

        </div>
        {user.username && <p className='text-xs text-center my-5'>{user.about}</p>}
        <Link href={'/sociosphere/profile'}><button className='px-4 py-2 rounded-full bg-red-500 text-sm font-medium text-white'>View Profile</button></Link>
      </section>
      <section className='h-[90vh] w-[55vw]  overflow-scroll  bg-white rounded-lg shadow-md'>

        <div className="posts flex flex-col items-center justify-start w-full overflow-scroll">
             <div class="max-w-[70%] rounded overflow-hidden  shadow-lg mt-16">
            <img class="w-full h-[450px] object-cover" src="/assets/images/model.jpg" alt="Sunset in the mountains" />
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
             <div class="max-w-[70%] rounded overflow-hidden  shadow-lg mt-16">
            <img class="w-full h-[450px] object-cover" src="/assets/images/model.jpg" alt="Sunset in the mountains" />
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
        </div>

      </section>
      <section className='h-[80vh] w-[20vw] bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-start'>
        <div className=' flex items-center justify-center w-[80%] p-1 bg-red-500 rounded-full'>
          <h2 className='font-bold text-white text-sm'>Friends</h2>
        </div>
        <div className='friends overflow-scroll w-full mt-5'>
          {
            user.username && user.friends.map(()=>{
              return <div className='w-full mt-2 h-[50px] border border-gray-200 rounded-md flex items-center p-2 justify-start'>
              <div className='w-[35px] h-[35px] rounded-full bg-black'>
  
              </div>
              <p className='text-sm font-medium ml-2 text-gray-700'>ayush2001</p>
            </div>
            }) 
          }

          {user.username && user.friends.length<1 && <div className="w-full flex items-center justify-center p-10 text-sm flex-col text-center "><p className="font-bold text-gray-600">0 Friends</p> <p className="font-normal text-xs text-gray-600 mt-2">Send request to users to make some friends.</p>
           </div>}
          
        
        </div>
      </section>
    </div>
  )
}

export default Feed
