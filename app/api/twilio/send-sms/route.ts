import { type NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Initialize Twilio client
// Replace with your actual Twilio credentials
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID || "YOUR_ACCOUNT_SID", // Replace with your actual SID
  process.env.TWILIO_AUTH_TOKEN || "YOUR_AUTH_TOKEN", // Replace with your actual token
)

export async function POST(request: NextRequest) {
  try {
    const { to, message } = await request.json()

    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER || "+1234567890", // Replace with your Twilio number
      to: to,
    })

    return NextResponse.json({
      success: true,
      messageId: sms.sid,
      status: sms.status,
    })
  } catch (error) {
    console.error("Error sending SMS:", error)
    return NextResponse.json({ success: false, error: "Failed to send SMS" }, { status: 500 })
  }
}
