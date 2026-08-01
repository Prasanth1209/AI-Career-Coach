const nodemailer = require("nodemailer");

let transporter = null;

async function getTransporter() {
    if (transporter) return transporter;

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        const missing = [];
        if (!user) missing.push("SMTP_USER");
        if (!pass) missing.push("SMTP_PASS");
        const errMsg = `Gmail SMTP credentials missing (${missing.join(", ")}). Please configure your Gmail address and Google App Password in backend/.env.`;
        console.error(`❌ [Mail Error] ${errMsg}`);
        throw new Error(errMsg);
    }

    transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: port === 465,
        auth: { user, pass }
    });

    console.log(`✉️ [Mail Config] Configured Gmail SMTP transport (${host}:${port}) for user: ${user}`);
    return transporter;
}

module.exports = { getTransporter };
