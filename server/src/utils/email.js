const nodemailer = require("nodemailer");
const { default: logger } = require("./logger");

class EmailSender {
  constructor({
    host = null,
    port = null,
    secure = null,
    user = null,
    pass = null,
  }) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendMail({ from, to, subject, text, html }) {
    try {
      const info = await this.transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });

      logger.info("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      logger.error("Error sending email:", error);
      throw error;
    }
  }
}
