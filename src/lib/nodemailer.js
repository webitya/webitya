import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  debug: true,
  logger: true,
})

export async function verifyEmailConnection() {
  try {
    console.log("[v0] SMTP Configuration Check:")
    console.log("[v0] SMTP_HOST:", process.env.SMTP_HOST)
    console.log("[v0] SMTP_PORT:", process.env.SMTP_PORT)
    console.log("[v0] SMTP_USER:", process.env.SMTP_USER)
    console.log("[v0] SMTP_PASS:", process.env.SMTP_PASS ? "***SET***" : "NOT SET")
    console.log("[v0] SMTP_FROM:", process.env.SMTP_FROM)

    await transporter.verify()
    console.log("[v0] Email server connection verified successfully")
    return true
  } catch (error) {
    console.error("[v0] Email server connection failed:")
    console.error("[v0] Error code:", error.code)
    console.error("[v0] Error message:", error.message)
    console.error("[v0] Full error:", error)
    return false
  }
}

export async function sendOTPEmail(email, otp, name) {
  try {
    console.log("[v0] Attempting to send OTP email to:", email)

    const isConnected = await verifyEmailConnection()
    if (!isConnected) {
      throw new Error("SMTP connection failed")
    }

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Verify Your Email - Webitya LMS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to Webitya LMS!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for signing up. Please verify your email address using the OTP below:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #2563eb; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>Best regards,<br>Webitya Team</p>
        </div>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("[v0] OTP email sent successfully:", result.messageId)
    return result
  } catch (error) {
    console.error("[v0] Failed to send OTP email:")
    console.error("[v0] Error details:", {
      code: error.code,
      message: error.message,
      command: error.command,
      response: error.response,
    })
    throw error
  }
}

export async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Welcome to Webitya LMS!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Webitya LMS!</h2>
        <p>Hi ${name},</p>
        <p>Your account has been successfully verified. You can now access our courses:</p>
        <ul>
          <li>Web Development</li>
          <li>Python Programming</li>
          <li>Digital Marketing</li>
        </ul>
        <p>Start your learning journey today!</p>
        <p>Best regards,<br>Webitya Team</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendPasswordResetEmail(email, resetToken, name) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Reset Your Password - Webitya LMS",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>Webitya Team</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendPurchaseConfirmationEmail(email, name, course) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Course Purchase Confirmed - ${course.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Purchase Confirmed!</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #2563eb;">Hi ${name},</h2>
          <p>Congratulations! Your purchase of <strong>${course.title}</strong> has been confirmed.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Course Details:</h3>
            <p><strong>Course:</strong> ${course.title}</p>
            <p><strong>Price:</strong> ₹${course.price.toLocaleString()}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Level:</strong> ${course.level}</p>
          </div>
          
          <p>You can now access all course materials, videos, and resources. Start your learning journey today!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Start Learning Now
            </a>
          </div>
          
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Happy Learning!<br>Webitya Team</p>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendLeadNotificationEmail(user, course, order) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM,
    subject: `New Course Purchase - ${course.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Course Purchase Alert</h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          
          <h3>Purchase Details:</h3>
          <p><strong>Course:</strong> ${course.title}</p>
          <p><strong>Amount:</strong> ₹${course.price.toLocaleString()}</p>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Payment ID:</strong> ${order.paymentId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p>A new student has enrolled in the course. Please ensure they have access to all materials.</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendLoginNotificationEmail(email, name, loginDetails) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "New Login to Your Webitya LMS Account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Login Alert</h2>
        <p>Hi ${name},</p>
        <p>We noticed a new login to your Webitya LMS account:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Time:</strong> ${loginDetails.timestamp}</p>
          <p><strong>IP Address:</strong> ${loginDetails.ip}</p>
          <p><strong>Device:</strong> ${loginDetails.userAgent}</p>
          <p><strong>Location:</strong> ${loginDetails.location || "Unknown"}</p>
        </div>
        
        <p>If this was you, you can safely ignore this email. If you didn't log in, please secure your account immediately by changing your password.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password" 
             style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Secure My Account
          </a>
        </div>
        
        <p>Best regards,<br>Webitya Security Team</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendSignupNotificationEmail(email, name) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Account Created Successfully - Webitya LMS",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Welcome to Webitya LMS!</h1>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #2563eb;">Hi ${name},</h2>
          <p>Thank you for creating an account with Webitya LMS! Your account has been successfully created.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Next Steps:</h3>
            <ol style="color: #374151;">
              <li>Verify your email address (check your inbox for OTP)</li>
              <li>Complete your profile setup</li>
              <li>Browse our available courses</li>
              <li>Start your learning journey!</li>
            </ol>
          </div>
          
          <p>Our courses include:</p>
          <ul>
            <li><strong>Web Development</strong> - Master modern web technologies</li>
            <li><strong>Python Programming</strong> - Learn Python from basics to advanced</li>
            <li><strong>Digital Marketing</strong> - Master online marketing strategies</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/live-learning" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Explore Courses
            </a>
          </div>
          
          <p>If you have any questions, our support team is here to help!</p>
          <p>Happy Learning!<br>Webitya Team</p>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendCourseProgressEmail(email, name, course, progress) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Course Progress Update - ${course.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Great Progress, ${name}!</h2>
        
        <p>You're making excellent progress in your <strong>${course.title}</strong> course.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Your Progress:</h3>
          <div style="background: #e5e7eb; border-radius: 10px; height: 20px; margin: 10px 0;">
            <div style="background: #2563eb; height: 20px; border-radius: 10px; width: ${progress.percentage}%;"></div>
          </div>
          <p><strong>${progress.percentage}% Complete</strong></p>
          <p>Lessons completed: ${progress.completedLessons} of ${progress.totalLessons}</p>
          <p>Time spent: ${progress.timeSpent}</p>
        </div>
        
        ${
          progress.percentage >= 50
            ? `
          <div style="background: #dcfce7; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #166534; margin: 0;"><strong>Halfway there!</strong> You're doing amazing. Keep up the great work!</p>
          </div>
        `
            : ""
        }
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Continue Learning
          </a>
        </div>
        
        <p>Keep up the momentum and achieve your learning goals!</p>
        <p>Best regards,<br>Webitya Team</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendCourseCompletionEmail(email, name, course) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Congratulations! You've completed ${course.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">You've completed ${course.title}</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #2563eb;">Amazing Achievement, ${name}!</h2>
          <p>You have successfully completed the <strong>${course.title}</strong> course. This is a significant milestone in your learning journey!</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">What's Next?</h3>
            <ul style="color: #374151;">
              <li>Download your certificate of completion</li>
              <li>Apply your new skills to real projects</li>
              <li>Explore our other courses to expand your knowledge</li>
              <li>Join our community of successful learners</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/certificates/${course.id}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">
              Download Certificate
            </a>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/live-learning" 
               style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Explore More Courses
            </a>
          </div>
          
          <p>We're proud of your dedication and hard work. Keep learning and growing!</p>
          <p>Best regards,<br>Webitya Team</p>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendWeeklyProgressEmail(email, name, weeklyStats) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Your Weekly Learning Summary - Webitya LMS",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Your Weekly Learning Summary</h2>
        <p>Hi ${name},</p>
        <p>Here's a summary of your learning activity this week:</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="text-align: center;">
              <h3 style="color: #2563eb; font-size: 24px; margin: 0;">${weeklyStats.lessonsCompleted}</h3>
              <p style="margin: 5px 0; color: #6b7280;">Lessons Completed</p>
            </div>
            <div style="text-align: center;">
              <h3 style="color: #2563eb; font-size: 24px; margin: 0;">${weeklyStats.timeSpent}</h3>
              <p style="margin: 5px 0; color: #6b7280;">Hours Learned</p>
            </div>
          </div>
        </div>
        
        ${
          weeklyStats.achievements.length > 0
            ? `
          <div style="background: #dcfce7; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #166534; margin-top: 0;">This Week's Achievements:</h4>
            <ul style="color: #166534;">
              ${weeklyStats.achievements.map((achievement) => `<li>${achievement}</li>`).join("")}
            </ul>
          </div>
        `
            : ""
        }
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Continue Learning
          </a>
        </div>
        
        <p>Keep up the great work and maintain your learning momentum!</p>
        <p>Best regards,<br>Webitya Team</p>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendBulkAnnouncementEmail(recipients, subject, content) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    bcc: recipients, // Use BCC for bulk emails
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Webitya LMS Announcement</h1>
        </div>
        
        <div style="padding: 30px;">
          ${content}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Webitya LMS
            </a>
          </div>
          
          <p>Best regards,<br>Webitya Team</p>
        </div>
      </div>
    `,
  }

  return await transporter.sendMail(mailOptions)
}
