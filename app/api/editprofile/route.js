import { NextResponse } from 'next/server';

const connectDB = require('../../../utils/dbConnect');
connectDB();
const userModel = require('../../../models/userModel');


export async function PATCH(req) {
  try {
    const body = await req.json();
    const { username, about, email,image } = body;
   
    const user = await userModel.findOneAndUpdate(
      { email },
      { username, about, image },
      { new: true }
    );

    if (user) {
      return new Response(JSON.stringify({ success: true }));
    } else {
      return new Response(JSON.stringify({ success: false }));
    }

    
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}
