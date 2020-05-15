const mongoose= require("mongoose");
const post_schema = new mongoose.Schema({
    title:{
        type:String,
        required:"Title is Mandatory"
       },
    content:{
     type:String,
     required:"Content is mandatory"
    },
    photo:{
        type:String,
        required:"Photo is mandatory"
       },
   
   
comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment",
    required:"Comment is mandatory"

}]
},
    {
        timestamps:true
    }
);
module.exports=mongoose.model("Post",post_schema);