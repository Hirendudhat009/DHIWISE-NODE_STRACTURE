/** 
 * emailService.js
 * @description :: exports function used in sending mails using mailgun provider
 */

const nodemailer = require('nodemailer');
const ejs = require('ejs');

const sendMail =  async (obj) => {
  let transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASSWORD
    }
  });
  if (!Array.isArray(obj.to)) {
    obj.to = [obj.to];
  }
  const htmlText = await ejs.renderFile(`${__basedir}${obj.template}/html.ejs`, obj.data);

  return await Promise.all(obj.to.map((emailId) => {
    let mailOpts = {
      from: obj.from || 'noreply@yoyo.co',
      to: emailId,
      subject: obj.subject,
      html: htmlText
    };
    transporter.sendMail(mailOpts, function (err, response) {
      if (err) {
        //ret.message = "Mail error.";
      } else {
        //ret.message = "Mail send.";
      }
    });
  }));
};
module.exports = { sendMail };
