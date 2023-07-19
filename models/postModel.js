const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

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
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
    
})

module.exports = mongoose.models.Post || mongoose.model('Post',postSchema)