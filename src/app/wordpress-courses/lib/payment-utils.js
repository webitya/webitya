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
 * Converts amount from rupees to paise
 * @param {number} amount - Amount in rupees
 * @returns {number} - Amount in paise
 */
export function convertToPaise(amount) {
  return Math.round(amount * 100)
}
