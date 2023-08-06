import connectDB from '../../../../utils/dbConnect';
import User from '../../../../models/userModel';
connectDB();


import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {

        const body = await req.json()
        const { userId,friendId } = body
        const user = await User.findOne({ "_id" : userId })
        const friend = await User.findOne({"_id":friendId})

        let newArr = user.requests.filter((item) => item != friendId);
        user.requests = newArr
        user.friends = [...user.friends,friendId]
        friend.friends = [...friend.friends,userId]
        await user.save()
        await friend.save()
        return NextResponse.json({ "success": true })


    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error!", {
            status: 500
        })
    }
}