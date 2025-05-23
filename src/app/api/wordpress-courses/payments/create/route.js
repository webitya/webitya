import { NextResponse } from "next/server";
import crypto from "crypto";

// Function to generate SHA256 hash
function generateSHA256Hash(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (
      !data.amount ||
      !data.orderId ||
      !data.customerName ||
      !data.customerEmail ||
      !data.customerPhone
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required payment information" },
        { status: 400 }
      );
    }

    // 🔐 PhonePe sandbox credentials (for testing only)
    const merchantId = "PGTESTPAYUAT";
    const saltKey = "b84690a2-327f-49a2-ae07-993efb1831ea";
    const saltIndex = "1";
    const apiEndpoint = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-test-domain.com";

    const amountInPaise = Math.round(data.amount * 100);

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: data.orderId,
      merchantUserId: `USER_${Date.now()}`,
      amount: amountInPaise,
      redirectUrl: `${baseUrl}/wordpress-courses/thank-you?orderId=${data.orderId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${baseUrl}/api/wordpress-courses/payments/webhook`,
      mobileNumber: data.customerPhone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Encode payload to base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    // Create SHA256 hash and X-VERIFY header
    const hashString = `${base64Payload}/pg/v1/pay${saltKey}`;
    const sha256Hash = generateSHA256Hash(hashString);
    const xVerify = `${sha256Hash}###${saltIndex}`;

    console.log("Making PhonePe API request...");

    // Send API request
    const phonePeRes = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const responseData = await phonePeRes.json();

    console.log("PhonePe API status:", phonePeRes.status);
    console.log("PhonePe response:", responseData);

    if (responseData.success) {
      return NextResponse.json({
        success: true,
        message: "Payment link generated",
        paymentUrl: responseData.data.instrumentResponse.redirectInfo.url,
        transactionId: responseData.data.transactionId,
      });
    } else {
      console.error("PhonePe API failed:", responseData);
      throw new Error(responseData.message || "Payment initialization failed");
    }
  } catch (error) {
    console.error("Payment API Error:", error);

    // Return mock payment URL in development
    if (process.env.NODE_ENV === "development") {
      const mockPaymentUrl = `https://pay.phonepe.com/pay/mock-payment?orderId=${Date.now()}`;
      return NextResponse.json({
        success: true,
        message: "Development mode mock payment URL",
        paymentUrl: mockPaymentUrl,
        transactionId: `TXN_DEV_${Date.now()}`,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate payment link",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
