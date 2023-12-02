import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema ({
    userName:{type:String,required:true},
    fullName:{type:String},
    profileImageURL:{type:String},  
}, {
    timestamps:true,
});

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User