import connectDB from '../../../utils/dbConnect';
import User from '../../../models/userModel';
connectDB();

import { NextResponse } from 'next/server'


export async function GET(req) {
    try {
      
        const username = req.nextUrl.searchParams.get('username')
        if (username) {
            const user = await User.findOne({username})
                .populate('posts','-__v')
                .populate({
                    path:'posts',
                    populate:{path:'Comment.userId'}
                })
                .exec()

            if (user) {
                return NextResponse.json({ "success": true, "user": user })
            }
            else {
                return NextResponse.json({ "success": false })
            }
        }
        else {
            return NextResponse.json({ "success": false })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ "success": false })

    }
}