import connectDB from '../../../utils/dbConnect';
import User from '../../../models/userModel';
connectDB();


import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        const body = await req.json()
        const { query } = body
        const user = await User.findOne({ username : query })
        if (user) {
            return NextResponse.json({ "success": true,"user":user.username })
        }
        else {
            return NextResponse.json({ "success": false })
        }

    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error!", {
            status: 500
        })
    }
}