const connectDB = require('../../../utils/dbConnect')
const userModel = require('../../../models/userModel')
import { NextResponse } from 'next/server';
connectDB()


export async function POST(req, res) {
    try {
        const body = await req.json()
        const { query } = body
        const user = await userModel.findOne({ username : query })
        if (user) {
            return NextResponse.json({ "success": true })
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