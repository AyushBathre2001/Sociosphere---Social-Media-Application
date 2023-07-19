
import connectDB from '../../../../utils/dbConnect';
import userModel from '../../../../models/userModel';
import postModel from '../../../../models/postModel';
connectDB();


export async function POST(req) {
  try {
    const body = await req.json();
    const { user,image,caption } = body;
   
    const post = await postModel.create({
        user,image,caption
    }
    );

    if(post){
        const founduser = await userModel.findOne({_id:user})
        founduser.posts = [...founduser.posts,post._id]
        await founduser.save()
        return new Response(JSON.stringify({success:true}))
    }
    else{
        return new Response(JSON.stringify({success:false}))
    }

  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}
