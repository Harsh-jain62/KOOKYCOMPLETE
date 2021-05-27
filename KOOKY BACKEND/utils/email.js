const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');
var smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = async (options) => {
  const emailsettings = await Email.findById({
    _id: '6017c839e79cb10cf82bb6c1',
  });
  let host = 'gmail';
  let user = 'divyank.ojha@digimonk.in';
  let pass = 'WELCOME@17';

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      // host: host,
      // tls: { rejectUnauthorized: true },
      // secureConnection: true,
      // port: 465,
      auth: {
        user: user,
        pass: pass,
      },
    })
  );

  //2 define email options
  const mailOptions = {
    from: `rajjain1467@gmail.com`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  //3 Actually send the email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
