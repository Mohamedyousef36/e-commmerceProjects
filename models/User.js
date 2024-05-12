import bcrypt from 'bcryptjs'

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim :true,
        required: [true,"user name is required"],
    },
    slug: {
        type: String,
        lowercase:true
    },
    email: {
        type: String,
        required: [true, "user name is required"],
        unique: [true, "email has been used"]
        
    },
    phone: {
        type: Number,
        // indexed: true,
        // sparse: true,
        unique: true
        
    },
    profileImage: {
        type:String
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength : [6,"Too short password"]
    },
    passwordChangeAt:{
        type: Date
    },

    passwordRestCode: {
        type: String
    },
    passwordRestCodeExpire: {
        type: Date
    },
   
    role: {
        type: String,
        enum: ['user','manager','admin'],
        default:"user"
    },
    active: {
        type: Boolean,
        default:true
    },
    // one to many 2 type child ref or parent ref => many thing => parent  && => few thing child 
    wishList: [{
        
        type: mongoose.Schema.ObjectId,
        ref:'Product'
    }],
    addresses: [
        {
            id: mongoose.Schema.Types.ObjectId,
            alias :String,
            details: String,
            city:String
            
        }
    ]
}, { timestamps: true })


const setImageUrl = (doc) => {
    if (doc.profileImage) {
        const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImage}`;
        doc.profileImage = imageUrl
    }
}

// get get all 
UserSchema.post("init", function (doc) {
    setImageUrl(doc);
});
// create
UserSchema.post("save", function (doc) {
    setImageUrl(doc);

});
// password hashing
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
    next()
})


export default mongoose.model("User",UserSchema)