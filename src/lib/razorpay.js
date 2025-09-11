// ✅ Razorpay configuration and utilities
import crypto from "crypto"
import Razorpay from "razorpay" // use ES import for consistency with Next.js ESM

// ✅ Config
export const razorpayConfig = {
  key_id: process.env.RAZORPAY_KEY_ID, // don't hardcode keys
  key_secret: process.env.RAZORPAY_KEY_SECRET,
}

/**
 * ✅ Create a Razorpay order
 * @param {number} amount - in rupees
 * @param {string} currency - default INR
 * @param {string} receipt - unique receipt id
 */
export const createRazorpayOrder = async (amount, currency = "INR", receipt) => {
  try {
    if (!razorpayConfig.key_id || !razorpayConfig.key_secret) {
      throw new Error("Razorpay keys are missing in environment variables")
    }

    const razorpay = new Razorpay({
      key_id: razorpayConfig.key_id,
      key_secret: razorpayConfig.key_secret,
    })

    const options = {
      amount: amount * 100, // Razorpay accepts paise
      currency,
      receipt,
      payment_capture: 1,
    }

    const order = await razorpay.orders.create(options)
    return order
  } catch (error) {
    console.error("[Razorpay] ❌ Order creation failed:", error)
    throw new Error(`Razorpay order creation failed: ${error.message}`)
  }
}

/**
 * ✅ Verify Razorpay payment signature
 */
export const verifyRazorpayPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac("sha256", razorpayConfig.key_secret)
      .update(body)
      .digest("hex")

    return expectedSignature === razorpay_signature
  } catch (error) {
    console.error("[Razorpay] ❌ Signature verification failed:", error)
    return false
  }
}
