import mongoose,{ Schema } from "mongoose";

const paperSchema = new Schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    // authors: {type:[String]}
});

const Paper = mongoose.models.Paper || mongoose.model('Paper',paperSchema,'papers');

export default Paper