const mongoose=require("mongoose");
const mongoDBErrors=require('mongoose-mongodb-errors');
mongoose.Promise=global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect("mongodb+srv://Bhanu_29:9980dontsteel@cluster0-pbefo.gcp.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

