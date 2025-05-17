import emailjs from "emailjs-com"

// Initialize EmailJS with your User ID
// This would typically be done in a useEffect in a component or in a _app.js file
// For this example, we'll initialize it here
const initEmailJS = () => {
  if (typeof window !== "undefined") {
    emailjs.init("YOUR_USER_ID") // Replace with your actual EmailJS User ID
  }
}

// Call initialization
initEmailJS()

/**
 * Send an enquiry email using EmailJS
 * @param {Object} data - The form data
 * @param {string} data.name - Customer name
 * @param {string} data.email - Customer email
 * @param {string} data.phone - Customer phone
 * @param {string} data.message - Customer message
 * @param {string} data.subject - Email subject
 * @param {string} [data.bikeName] - Optional bike name
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendEnquiry = async (data) => {
  try {
    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      message: data.message,
      subject: data.subject,
      bike_name: data.bikeName || "Not specified",
    }

    // Send the email
    const response = await emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
      templateParams,
    )

    return response
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

/**
 * Send a test ride booking email using EmailJS
 * @param {Object} data - The booking data
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendTestRideBooking = async (data) => {
  try {
    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone,
      bike_name: data.bikeName,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      message: data.message || "No additional message",
    }

    // Send the email
    const response = await emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
      "YOUR_TEST_RIDE_TEMPLATE_ID", // Replace with your EmailJS Template ID for test rides
      templateParams,
    )

    return response
  } catch (error) {
    console.error("Error sending test ride booking:", error)
    throw error
  }
}
