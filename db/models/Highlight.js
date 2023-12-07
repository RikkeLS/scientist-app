import mongoose, { Schema} from "mongoose";

const highlightSchema = new Schema({
    title:{type:String,required:true},
    mainText:{type:String},
    imageURL:{type:String},
    refLink:{type:String},
    refText:{type:String},
    userID:{type:Schema.Types.ObjectId,required:true,ref: "User"},
    paperID:{type:Schema.Types.ObjectId, ref: "Paper"}
}, {
    timestamps:true,
});

const Highlight = mongoose.models.Highlight || mongoose.model('Highlight',highlightSchema,'highlights');

export default Highlight