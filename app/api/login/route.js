const connectDB = require('../../../utils/dbConnect')
const userModel = require('../../../models/userModel')
const bcrypt = require('bcrypt');
import { NextResponse } from 'next/server';
var jwt = require('jsonwebtoken');
connectDB()


export async function POST(req, res) {
    try {
        const body = await req.json()
        const { username, password } = body
        const user = await userModel.findOne({username})
        if(user){
            const match = await bcrypt.compare(password, user.password)
            if(match){
                var token = jwt.sign({ user }, process.env.JWT_SECRET);
                return NextResponse.json({"success":true,"token":token,"user":user})
            }
            else{
                return NextResponse.json({"success":false,"message":"Invalid User Credentials!"})
            }
        }
        else{
            return NextResponse.json({"success":false,"message":"Invalid User Credentials!"})
        }
        
    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error!",{
            status:500
        })
    }
}