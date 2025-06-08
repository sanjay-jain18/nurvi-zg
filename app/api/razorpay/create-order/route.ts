import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

// Initialize Razorpay
// Replace with your actual Razorpay credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID", // Replace with your actual key
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET", // Replace with your actual secret
})

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
