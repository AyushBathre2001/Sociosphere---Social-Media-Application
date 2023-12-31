import connectDB from '../../../utils/dbConnect';
import User from '../../../models/userModel';
connectDB();

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
const jwt = require('jsonwebtoken')

export async function GET(req) {
    try {
        const headersInstance = headers()
        const socioToken = headersInstance.get('socioToken')
        var decoded = jwt.verify(socioToken, process.env.JWT_SECRET);
        if (decoded) {
            const user = await User.findOne({_id:decoded.user})
                .populate('posts','-__v')
                .populate({
                    path:'posts',
                    populate:{path:'Comment.userId'}
                })
                .populate('friends')
                .populate('requests')
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