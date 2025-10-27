export function userThankYouEmail(name) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #000000 0%, #222222 100%);
            color: #ffffff;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #000;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
            line-height: 1.8;
          }
          .highlight {
            background-color: #f0f0f0;
            padding: 20px;
            border-left: 4px solid #000;
            margin: 20px 0;
            border-radius: 4px;
          }
          .highlight p {
            margin: 0;
            color: #333;
            font-size: 15px;
          }
          .cta-button {
            display: inline-block;
            background-color: #000;
            color: #ffffff;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
          }
          .cta-button:hover {
            background-color: #333;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            font-size: 13px;
            color: #666;
          }
          .footer-links {
            margin-top: 15px;
          }
          .footer-links a {
            color: #000;
            text-decoration: none;
            margin: 0 10px;
            font-weight: 500;
          }
          .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 30px 0;
          }
          .emoji {
            font-size: 24px;
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><span class="emoji">🚀</span>Webitya Web Services</h1>
            <p>Digital Marketing & Web Development</p>
          </div>

          <div class="content">
            <div class="greeting">
              <span class="emoji">👋</span>Hi ${name},
            </div>

            <div class="message">
              Thank you so much for reaching out to us! We're thrilled to hear from you and excited about the possibility of working together.
            </div>

            <div class="highlight">
              <p>
                <strong>What happens next?</strong><br>
                Our team will review your inquiry and get back to you within 24-48 hours with personalized recommendations tailored to your needs.
              </p>
            </div>

            <div class="message">
              In the meantime, feel free to explore our services and check out some of our recent projects. If you have any urgent questions, don't hesitate to reach out directly.
            </div>

            <div style="text-align: center;">
              <a href="https://webitya.com/services" class="cta-button">Explore Our Services</a>
            </div>

            <div class="divider"></div>

            <div class="message" style="font-size: 14px; color: #666;">
              <strong>Why choose Webitya?</strong><br>
              ✓ Result-driven marketing strategies<br>
              ✓ Custom web development solutions<br>
              ✓ Dedicated support team<br>
              ✓ Proven track record with startups and businesses
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0 0 15px 0;">
              <strong>Webitya Web Services</strong><br>
              Digital Marketing Trainer & Consultant
            </p>
            <div class="footer-links">
              <a href="https://webitya.com">Website</a>
              <a href="https://webitya.com/contact">Contact</a>
              <a href="https://webitya.com/services">Services</a>
            </div>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
              © 2025 Webitya Web Services. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function adminLeadEmail(name, email, description) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .alert-badge {
            display: inline-block;
            background-color: #ff6b6b;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
          }
          .content {
            padding: 30px;
          }
          .lead-info {
            background-color: #f8f9fa;
            border: 2px solid #000;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .info-row {
            margin-bottom: 15px;
            display: flex;
            align-items: flex-start;
          }
          .info-label {
            font-weight: 700;
            color: #000;
            min-width: 100px;
            margin-right: 15px;
          }
          .info-value {
            color: #555;
            word-break: break-word;
            flex: 1;
          }
          .message-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .message-box p {
            margin: 0;
            color: #333;
            font-size: 14px;
            line-height: 1.6;
          }
          .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
          }
          .btn {
            flex: 1;
            padding: 12px;
            text-align: center;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.3s;
          }
          .btn-primary {
            background-color: #000;
            color: white;
          }
          .btn-primary:hover {
            opacity: 0.8;
          }
          .btn-secondary {
            background-color: #e9ecef;
            color: #000;
          }
          .btn-secondary:hover {
            opacity: 0.8;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #666;
          }
          .timestamp {
            color: #999;
            font-size: 12px;
            margin-top: 20px;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Lead Received</h1>
            <div class="alert-badge">ACTION REQUIRED</div>
          </div>

          <div class="content">
            <p style="font-size: 16px; margin-bottom: 20px;">
              A new inquiry has been submitted through your contact form. Here are the details:
            </p>

            <div class="lead-info">
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value"><strong>${name}</strong></span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></span>
              </div>
              <div class="info-row">
                <span class="info-label">Message:</span>
                <span class="info-value">${description.replace(/\n/g, "<br>")}</span>
              </div>
            </div>

            <div class="message-box">
              <p>
                <strong>💡 Tip:</strong> Reply to this email or click the button below to contact the lead directly.
              </p>
            </div>

            <div class="action-buttons">
              <a href="mailto:${email}" class="btn btn-primary">Reply to Lead</a>
              <a href="https://webitya.com/admin/leads" class="btn btn-secondary">View All Leads</a>
            </div>

            <div class="timestamp">
              Received: ${new Date().toLocaleString()}
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0;">
              This is an automated notification from Webitya Web Services.<br>
              Please do not reply to this email address.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}
