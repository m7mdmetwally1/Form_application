const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, { otpCode, url } = {}) {
    this.firstName = user.firstName;
    this.from = `mohamed metwally <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.otpNumber = otpCode;
    this.url = url;
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

  async send(template, message) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      url: this.url,
      subject: template,
      html: `<html>
      <body>
      ${message}
      and this is  the url to confirm
      ${this.url}
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
    await this.send("welcome", `your otp number is ${this.otpNumber}`);
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
