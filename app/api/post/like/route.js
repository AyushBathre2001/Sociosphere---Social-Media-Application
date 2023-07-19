import connectDB from '../../../../utils/dbConnect';
import postModel from '../../../../models/postModel';
connectDB();
import { NextResponse } from 'next/server'

export async function PATCH(req) {
    try {

        const body = await req.json()
        const {userId,postId} = body
        let post = await postModel.findById(postId)
        if(post.like.includes(userId)){
            let newArr = post.like.filter((item) => item != userId);

            post.like = newArr
            await post.save()
        }
        else{
            post.like = [...post.like,userId]
            await post.save()
        }
       
        return NextResponse.json({ "success": true })

    } catch (error) {

        console.log(error)
        return NextResponse.json({ "success": false })

    }
}