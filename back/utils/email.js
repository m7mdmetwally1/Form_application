const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, otpNumber) {
    this.firstName = user.firstName;
    this.from = `mohamed metwally <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.otpNumber = otpNumber;
  }

  newTransport() {
    return nodemailer.createTransport({
      name: "example.com",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SERNDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });
  }

  async send(otpNumber) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "my subject",
      html: `<html>
      <body>
     this is the otp Number  ${otpNumber}
      </body>
     </html>`,
    };

    await this.newTransport()
      .sendMail(mailOptions)
      .then(() => {
        console.log("email sent");
      })
      .catch(() => {
        console.log("error sent");
      });
  }

  async sendWelcome() {
    await this.send(this.otpNumber);
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
