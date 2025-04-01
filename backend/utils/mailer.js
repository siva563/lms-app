const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send email with given options
 */
const sendEmail = async (to, subject, htmlContent) => {
    const mailOptions = {
        from: `"CodeBegun LMS" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
