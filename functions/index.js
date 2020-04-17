const functions = require('firebase-functions');
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

admin.initializeApp()

//google account credentials used to send email
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.sendEmail = functions
  .region('asia-northeast1')
  .firestore
  .document('messages/{messageId}')
  .onCreate((snap, context) => {

    const mailOptions = {
      from: `${gmailEmail}`,
      to: `${gmailEmail}`,
      subject: 'contact form message',
      html: `<h1>Order Confirmation</h1>
                                <p>
                                   <b>Email: </b>${snap.data().name}<br>
                                </p>`
    };


    return transporter.sendMail(mailOptions, (error, data) => {
      console.log('snap', snap.data());
      if (error) {
        console.log('fucking error', error)
        console.log('data', data),
          console.log('mailOptions', mailOptions)
        return
      }
      console.log("Sent!")
    });
  });


// exports.sendServiceMail = functions.firestore
//   .document('service-messages/{messageId}')
//   .onCreate((snap, context) => {
//
//     const mailOptions = {
//       from: `${gmailEmail}`,
//       to: `${gmailEmail}`,
//       subject: 'contact form message',
//       html: `<h1>Order Confirmation</h1>
//                                 <p>
//                                    <b>Email: </b>${snap.data().name}<br>
//                                 </p>`
//     };
//
//
//     return transporter.sendMail(mailOptions, (error, data) => {
//       console.log('snap', snap.data());
//       if (error) {
//         return
//       }
//       console.log("Sent!")
//     });
//   });
