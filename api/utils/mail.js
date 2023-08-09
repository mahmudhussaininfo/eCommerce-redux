const nodemailer = require("nodemailer");

const sendMail = ({ to, sub, msg }) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "mahmudhussain504@gmail.com",
      pass: "gexghmtkgtcyulwg",
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: "eCommmerce <mahmudhussain504@gmail.com>",
    to: to,
    subject: sub,
    text: msg,
  });
};

//export
module.exports = {
  sendMail,
};
