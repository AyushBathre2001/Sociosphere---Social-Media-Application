import connectDB from '../../../utils/dbConnect';
import User from '../../../models/userModel';
connectDB();


import { NextResponse } from 'next/server';

export async function GET(req, res) {
    try {
        var regexp = new RegExp("^"+ req.nextUrl.searchParams.get('q'));
        const users = await User.find({ username: regexp})
        if (users) {
            return NextResponse.json({ "success": true,"users":users })
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