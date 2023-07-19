const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg"
    },
    about:{
        type:String,
        default:"..."
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    fpcode:{
        type:String
    }
})

module.exports = mongoose.models.User || mongoose.model('User',userSchema)