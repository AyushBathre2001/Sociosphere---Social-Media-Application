
import connectDB from '../../../../utils/dbConnect';
import User from '../../../../models/userModel';
connectDB();


import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const body = await req.json()
        const { userId,friendId } = body
        const user = await User.findOne({"_id": friendId })

        if(user.requests.includes(userId)){
            return NextResponse.json({ "success": true })
        }
        else{
            user.requests = [...user.requests,userId]
            await user.save()
            return NextResponse.json({ "success": true })
        }
    
    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error!", {
            status: 500
        })
    }
}