const express = require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Express body parser

app.get('/',(req,res)=>{
    res.render('Pratik');
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


app.listen(80,()=>{
    console.log("Server Started at http://localhost");
});