const connectDB = require('../../../utils/dbConnect')
const userModel = require('../../../models/userModel')
const bcrypt = require('bcrypt');
import { NextResponse } from 'next/server';

connectDB()


export async function POST(req, res) {
    try {
        const body = await req.json()
        const { email, username, password } = body

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await userModel.create({
            username, email, "password":hash
        })

        if(user){
            return NextResponse.json({"success":true})
        }
        else{
            return NextResponse.json({"success":false})
        }

    } catch (error) {
        console.log(error)
        return new Response("Internal Server Error!",{
            status:500
        })
    }
}