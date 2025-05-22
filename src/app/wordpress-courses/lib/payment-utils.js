import crypto from "crypto"

/**
 * Generates a SHA256 hash of the given string
 * @param {string} string - The string to hash
 * @returns {string} - The SHA256 hash
 */
export function generateSHA256Hash(string) {
  return crypto.createHash("sha256").update(string).digest("hex")
}

/**
 * Generates a signature for payment verification
 * @param {Object} payload - The payload to sign
 * @param {string} saltKey - The salt key for signing
 * @returns {string} - The generated signature
 */
export function generateSignature(payload, saltKey) {
  const stringToSign = JSON.stringify(payload) + saltKey
  return generateSHA256Hash(stringToSign)
}

/**
 * Validates a webhook signature
 * @param {string} signature - The signature to validate
 * @param {Object} payload - The payload that was signed
 * @param {string} saltKey - The salt key used for signing
 * @returns {boolean} - Whether the signature is valid
 */
export function validateSignature(signature, payload, saltKey) {
  const expectedSignature = generateSignature(payload, saltKey)
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

/**
 * Generates a unique order ID
 * @returns {string} - A unique order ID
 */
export function generateOrderId() {
  return `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

/**
 * Converts amount from rupees to paise
 * @param {number} amount - Amount in rupees
 * @returns {number} - Amount in paise
 */
export function convertToPaise(amount) {
  return Math.round(amount * 100)
}

/**
 * Converts amount from paise to rupees
 * @param {number} amount - Amount in paise
 * @returns {number} - Amount in rupees
 */
export function convertToRupees(amount) {
  return amount / 100
}
