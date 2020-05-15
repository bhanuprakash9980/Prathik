const express = require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const mongoose=require("mongoose");
const multer=require('multer');
const path=require('path');
require("dotenv").config();
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
var x;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null,x= file.fieldname + '-' + Date.now() +  path.extname(file.originalname))
   
  }
});

var upload = multer({ storage: storage });



app.get('/',(req,res)=>{
    res.render('Pratik');
});
app.get('/'+process.env.secret,(req,res)=>{
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
        user: 'rvceabfh@gmail.com', // generated ethereal user
        pass: 'rvceabfh@123'  // generated ethereal password
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


app.post("/", upload.single('myFile'),(req,res)=>{
 
    const file = req.file;
    if (!file) {
      console.log('Please upload a file')
  
    }
       const post =new Post();
      post.title=req.body.title;
      post.content=req.body.content;
      post.photo=x;  
   post.save();
          
    
  res.redirect('/posts');
  
  });
  app.post("/:postId/comment",async(req,res)=>{
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
    app.get("/:postId/comment",async(req,res)=>{
        const post= await Post.findOne({_id:req.params.postId}).populate("comments");
res.send(post);
});



app.listen(80,()=>{
    console.log("Server Started at http://localhost");
});