const twilio = require("twilio");

module.exports = class SMS {
  constructor(user) {
    this.firstName = user.firstName;
    this.phoneNumber = user.mobile;
    this.from = process.env.TWILIO_PHONE_NUMBER;
  }

  newTransport() {
    return twilio(process.env.TWILLO_SID, process.env.AUTH_TOKEN);
  }

  async send(message) {
    const smsOptions = {
      from: this.from,
      to: this.phoneNumber,
      body: message,
    };

    console.log(this.phoneNumber);
    await this.newTransport()
      .messages.create(smsOptions)
      .then((message) => {
        console.log(`SMS sent: ${message.sid}`);
      })
      .catch((error) => {
        console.error(`Error sending SMS: ${error}`);
      });
  }

  async sendWelcome() {
    const message = `Hello ${this.firstName}, welcome to our service!`;
    await this.send(message);
  }

  async sendPasswordReset(token) {
    const message = `Hello ${this.firstName}, your password reset token is: ${token}`;
    await this.send(message);
  }
};
