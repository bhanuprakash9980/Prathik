const express = require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const mongoose=require("mongoose");
const multer=require('multer');
const path=require('path');
require("./mongo");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
//Models
require('./model/Post');
require('./model/comment');
// Express body parser

const Post=mongoose.model("Post");
const Comment=mongoose.model("Comment");
var x=[];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null,x.push( file.fieldname + '-' + Date.now() +  path.extname(file.originalname)))
   
  }
});

var upload = multer({ storage: storage });



app.get('/',(req,res)=>{
    res.render('Pratik');
});
app.get('/9980dontsteel',(req,res)=>{
  res.render('enterposts');
});
app.get('/About',(req,res)=>{
    res.render('Aboutme');
});

app.post('/message',urlencodedParser,(req,res)=>{
const output=` 
<p>You have a new get in touch request</p>
<h3>Contact Details</h3>
<ul>  
  <li>Name: ${req.body.Name}</li>
  <li>Email: ${req.body.email}</li>
 </ul>
<h3>Message</h3>
<p>${req.body.Message}</p>

`;
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
      user: "tecsok.2020@gmail.com", // generated ethereal user
      pass: "Tecsok@123" // generated ethereal password
  },
  tls:{
    rejectUnauthorized:false
  }
});



  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Get in touch" <bhanuprakash.cs18@rvce.edu.in>', // sender address
      to: 'connectprathik@gmail.com,bhanuprakashshettigar@gmail.com', // list of receivers
      subject: 'Get in touch Request', // Subject line
      text: '', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.redirect('/');
  });




 
});


app.get("/blogs",async(req,res)=>{
  
    const posts=await Post.find({});
   res.render('allposts',{posts:posts});

});


app.post("/", upload.array('myFiles', 12),async(req,res)=>{
 
    const files = req.files;
    if (!files) {
      console.log('Please upload a file')
  
    }
       const post =new Post();
      post.title=req.body.title;
      post.desc=req.body.desc;
      post.content=req.body.content;
      post.photo=x;  
      x=[];
   await post.save();
          
    
  res.redirect('/blogs');
  
  });
  app.get("/blogs/:postId",async(req,res)=>{
    const post=await Post.findOne({_id:req.params.postId});
    res.render('post',{post:post});
  });

  app.post("/blogs/:postId/comment",async(req,res)=>{
    //Find a post 
    const post= await Post.findOne({_id:req.params.postId});
    
    //Create a comment
    const comment = new Comment();
    comment.content=req.body.content;
    comment.post=post._id;
    await comment.save();
    //Associate Post with commentt
    post.comments.push(comment._id);
    await post.save();
    res.send(comment);
    });
    app.get("/blogs/:postId/comment",async(req,res)=>{
        const post= await Post.findOne({_id:req.params.postId}).populate("comments");
res.send(post);
});



app.listen(3000,()=>{
    console.log("Server Started at http://localhost:3000");
});
