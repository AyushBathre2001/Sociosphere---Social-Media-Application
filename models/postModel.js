const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
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
        ref:'user'
    }],
    
    Comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
    
})

module.exports = mongoose.models.post || mongoose.model('post',postSchema)