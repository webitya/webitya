// /app/api/send/route.js

import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, html, senderEmail, senderPass } = body;

    if (!to || !subject || !html || !senderEmail || !senderPass) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields.'
      }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to) || !emailRegex.test(senderEmail)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email format.'
      }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: senderPass,
      },
    });

    const plainText = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    const enhancedHtml = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        ${html}
        <br/><br/>
        <hr/>
        <p style="font-size: 12px; color: #777;">
          Sent by <strong>Webitya Web Services</strong><br>
          📍 Ganga Nagar, Harmu Housing Colony, Ranchi, Jharkhand 834002<br>
          🌐 <a href="https://webitya.com" target="_blank">webitya.com</a> | 📧 support@webitya.com
        </p>
        <p style="font-size: 11px; color: #aaa;">
          You're receiving this email from ${senderEmail}. If this wasn't expected, 
          please ignore or <a href="#">unsubscribe</a>.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: {
        name: 'Webitya Web Services',
        address: senderEmail,
      },
      to,
      subject,
      text: plainText,
      html: enhancedHtml,
      replyTo: senderEmail,
      headers: {
        'X-Mailer': 'WebityaMailer',
        'List-Unsubscribe': '<mailto:unsubscribe@webitya.com>',
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to send email.',
      details: error.message || error.toString()
    }), { status: 500 });
  }
}
