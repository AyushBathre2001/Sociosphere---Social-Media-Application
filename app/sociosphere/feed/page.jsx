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
        <Link href={`/sociosphere/profile/${user.username}`}><button className='px-4 py-2 rounded-full bg-red-500 text-sm font-medium text-white'>View Profile</button></Link>
      </section>
      <section className='h-[90vh] relative w-[55vw] flex justify-center items-center overflow-scroll  bg-white rounded-lg shadow-md'>
          
          <div className="tri w-full h-7 bg-red-500 absolute top-0">
          </div>
           <p className="text-sm text-gray-500">No feed Available.</p>
       

      </section>
      <section className='h-[80vh] w-[20vw] bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-start'>
        <div className=' flex items-center justify-center w-[80%] p-1 bg-red-500 rounded-full'>
          <h2 className='font-bold text-white text-sm'>Friends</h2>
        </div>
        <div className='friends overflow-scroll w-full mt-5'>
          {
            user.username && user.friends.map((item)=>{
              return  <Link href={`/sociosphere/profile/${item.username}`}><div key={item._id} class="flex justify-center cursor-pointer relative ">

              <div class="relative grid grid-cols-1 gap-4 p-3 mb-2 w-full border rounded-lg bg-white ">
                <div class="relative flex gap-4">
                  <img src={item.image} class="relative rounded-lg  bg-white border h-10 w-10" alt="" loading="lazy" />
                  <div class="flex flex-col w-full">
                    <div class="flex flex-row ">
                      <p class="relative text-sm font-bold text-gray-800 whitespace-nowrap truncate overflow-hidden">{item.username}</p>
                    </div>
                    <p class="text-gray-400 text-sm">{item.email}</p>
                  </div>
                </div>
              </div>

            </div>
            </Link>
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
