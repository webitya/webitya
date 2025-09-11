import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"
import clientPromise from "./mongodb"

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function getUserById(userId) {
  try {
    const client = await clientPromise
    const db = client.db("webitya_lms")

    const objectId = ObjectId.isValid(userId) ? new ObjectId(userId) : userId
    return await db.collection("users").findOne({ _id: objectId })
  } catch (error) {
    console.error("Error in getUserById:", error)
    return null
  }
}

export async function getUserByEmail(email) {
  const client = await clientPromise
  const db = client.db("webitya_lms")
  return await db.collection("users").findOne({ email })
}
