const mongoose = require('mongoose')
const User = require('./userModel')

const PostSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    image:{
        type:String,
        required:true
    },

    caption:{
        type:String,     
    },

    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    
    Comment:[{
        userId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        comment:{
            type:String
        }
        
    }]
    
})

var Post = mongoose.models.Post || mongoose.model('Post',PostSchema)

export default Post