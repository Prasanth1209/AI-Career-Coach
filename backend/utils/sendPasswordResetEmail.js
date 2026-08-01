const { getTransporter } = require("../config/mail");

/**
 * Send HTML Password Reset email with clickable token link
 */
async function sendPasswordResetEmail(email, token, name = "Student") {
    const transporter = await getTransporter();
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5000";
    const resetLink = `${clientUrl}/#reset-password?token=${token}`;
    const fromAddress = process.env.SMTP_FROM || `"AI Career Coach" <no-reply@aicareercoach.com>`;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; margin: 0; }
            .container { max-width: 580px; margin: 0 auto; background: #1e293b; border-radius: 12px; border: 1px solid #334155; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            .header { text-align: center; margin-bottom: 24px; }
            .brand { font-size: 24px; font-weight: 700; color: #6366f1; }
            .brand span { color: #38bdf8; }
            h2 { color: #f8fafc; font-size: 20px; margin-bottom: 12px; }
            p { color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 20px; }
            .btn-container { text-align: center; margin: 30px 0; }
            .btn { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4); }
            .link-box { background: #0f172a; border: 1px solid #334155; padding: 12px; border-radius: 6px; font-size: 13px; color: #38bdf8; word-break: break-all; margin-top: 20px; }
            .footer { font-size: 12px; color: #64748b; text-align: center; margin-top: 30px; border-top: 1px solid #334155; padding-top: 16px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="brand">AI Career <span>Coach</span></div>
            </div>
            <h2>Password Reset Request</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>We received a request to reset your password for your AI Career Coach account. Click the button below to choose a new password.</p>
            <div class="btn-container">
                <a href="${resetLink}" target="_blank" class="btn">Reset Password</a>
            </div>
            <p>This password reset link is valid for <strong>15 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
            <div class="link-box">${resetLink}</div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} AI Career Coach. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;

    console.log(`🔗 [Email] Password reset link generated for ${email}: ${resetLink}`);

    const info = await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: "Reset your password - AI Career Coach",
        html: htmlContent
    });

    console.log(`✉️ [Email] Password reset email successfully dispatched to ${email}. MessageID: ${info.messageId}`);
    return info;
}

module.exports = {
    sendPasswordResetEmail
};
