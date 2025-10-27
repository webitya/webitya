export const userThankYouEmail = (name) => `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; border: 1px solid #e5e7eb;">
      <h2 style="color: #4f46e5;">Thank You, ${name}!</h2>
      <p style="font-size: 16px; color: #374151;">
        We’ve received your message and our team will reach out to you shortly.
      </p>
      <p style="font-size: 14px; color: #6b7280;">
        Meanwhile, feel free to explore <b>Webitya</b> and see how we can help you grow online.
      </p>
      <a href="https://webitya.com" 
         style="display:inline-block;margin-top:20px;padding:10px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px;font-weight:500;">
         Visit Webitya
      </a>
      <p style="margin-top:30px;font-size:12px;color:#9ca3af;">
        — The Webitya Team
      </p>
    </div>
  </div>
`;

export const adminLeadEmail = (name, email, phone, requirement) => `
  <div style="font-family: Arial, sans-serif; background: #f3f4f6; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 25px; border: 1px solid #e5e7eb;">
      <h2 style="color: #111827;">New Lead Received 🚀</h2>
      <p style="font-size: 16px; color: #374151;">
        <b>Name:</b> ${name}<br>
        <b>Email:</b> ${email}<br>
        <b>Phone:</b> ${phone || "Not provided"}<br>
        <b>Requirement:</b><br>${requirement}
      </p>
      <p style="margin-top: 20px; font-size: 13px; color: #6b7280;">
        Submitted via Webitya Contact Form.
      </p>
    </div>
  </div>
`;
