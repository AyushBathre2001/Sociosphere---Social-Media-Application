const connectDB = require('../../../utils/dbConnect')
const userModel = require('../../../models/userModel')
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
const jwt = require('jsonwebtoken')

export async function GET(req){
    try {
        const headersInstance = headers()
        const socioToken = headersInstance.get('socioToken')
        var decoded = jwt.verify(socioToken, process.env.JWT_SECRET);
        if(decoded){
            return NextResponse.json({"success":true,"user":decoded})
        }
        else{
            return NextResponse.json({"success":false})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({"success":false})
       
    }
}