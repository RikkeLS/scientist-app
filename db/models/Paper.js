import mongoose,{ Schema } from "mongoose";

const paperSchema = new Schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    summary:{type:String},
    authors:{type:[String],required:true},
    links:{type:[Object]},
    published:{type:String,required:true},
    updated:{type:String,required:true},
    userID:{type:Schema.Types.ObjectId,required:true,ref: "User"},
}, {
    timestamps:true,
});

const Paper = mongoose.models.Paper || mongoose.model('Paper',paperSchema,'papers');

export default Paper