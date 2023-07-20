import connectDB from '../../../../utils/dbConnect';
import Post from '../../../../models/postModel';
connectDB();
import { NextResponse } from 'next/server'

export async function PATCH(req) {
    try {

        const body = await req.json()
        const {userId,postId,comment} = body
        let post = await Post.findById(postId).populate('Comment.userId')
        if(userId && comment){
            post.Comment = [...post.Comment,{userId:userId,comment:comment}]
            await post.save()
            return NextResponse.json({ "success": true,"comments":post.Comment })
        }
        else{
            return NextResponse.json({ "success": true,"comments":post.Comment })
        }

    } catch (error) {

        console.log(error)
        return NextResponse.json({ "success": false })

    }
}