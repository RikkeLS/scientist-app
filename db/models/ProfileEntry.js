import mongoose,{ Schema } from "mongoose";

const profileEntrySchema = new Schema({
    template:{type:String},
    title:{type:String,required:true},
    mainText:{type:String},
    userID:{type:Schema.Types.ObjectId,required:true,ref: "User"},
}, {
        timestamps:true,
});


const ProfileEntry = mongoose.models.ProfileEntry || mongoose.model('ProfileEntry',profileEntrySchema,'profileEntries');

export default ProfileEntry