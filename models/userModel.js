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
        ref:'post'
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    fpcode:{
        type:String
    }
})

module.exports = mongoose.models.user || mongoose.model('user',userSchema)