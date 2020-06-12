const express = require('express');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');




const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
//Models


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
app.get('/letsworktogether',(req,res)=>{
  res.render('letswork');
});
app.post('/lets',urlencodedParser,(req,res)=>{
  const output=` 
 <h1>You have a new Let's Work Together Request</h1>
 <h3>Are You a business owner looking for marketing services ?</h3>
  <p>${req.body.looking}</p>
  <h3> What is your Name?</h3>
  <p>${req.body.Name}</p>
  <h3>What is the name of your company?</h3>
  <p>${req.body.name_company}</p>
  <h3> What is the URL of your website?</h3>
  <p>${req.body.website_url}</p>
  <h3> Describe your Business , Product Or Service</h3>
  <p>${req.body.desc_comp}</p>
  <h3>What is your main Priority right now?</h3>
  <p>${req.body.priority}</p>
  <h3>What is your biggest hurdle currently?</h3>
  <p>${req.body.hurdle}</p>
  <h3>What is your Marketing Budget?</h3>
  <p>${req.body.budjet}</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Email : ${req.body.email}</li>
  <li>Phone : ${req.body.phone}</li>
  </ul>
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
        from: '"Let\'s Work Together! " <bhanuprakash.cs18@rvce.edu.in>', // sender address
        to: 'connectprathik@gmail.com,bhanuprakashshettigar@gmail.com', // list of receivers
        subject: 'Let\'s Work Together request', // Subject line
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
app.listen(3000,()=>{
    console.log("Server Started at http://localhost:3000");
});
