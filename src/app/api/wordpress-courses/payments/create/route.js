import crypto from 'crypto';

export async function POST(req) {
  try {
    const { name, email, phone } = await req.json();

    // Hardcoded credentials
    const merchantId = "WEBITYAWEBONLINE";
    const saltKey = "c60001a0-2c9b-430c-b7df-6c05997ecf91";
    const saltIndex = "1";

    // Amount in paisa (₹149.00 = 14900 paisa)
    const amount = 14900;
    const transactionId = `TXN_${Date.now()}`;

    const redirectUrl = `https://www.webitya.com/payment-success?transactionId=${transactionId}`;
    const callbackUrl = `https://www.webitya.com/api/payment-callback`;

    // PhonePe Payment Payload
    const payload = {
      merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: phone,
      amount: amount,
      redirectUrl,
      redirectMode: "POST",
      callbackUrl,
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    // Convert to base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Generate X-VERIFY using SHA256
    const stringToHash = base64Payload + "/pg/v1/pay" + saltKey;
    const xVerify = crypto.createHash("sha256").update(stringToHash).digest("hex") + "###" + saltIndex;

    // Make API request to PhonePe
    const phonePeRes = await fetch("https://api.phonepe.com/apis/hermes/pg/v1/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": merchantId
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const resData = await phonePeRes.json();

    if (phonePeRes.ok && resData.success && resData.code === "PAYMENT_INITIATED") {
      const redirectUrl = resData.data.instrumentResponse.redirectInfo.url;
      return Response.json({ success: true, redirectUrl });
    } else {
      console.error("PhonePe API Error Response:", resData);
      return Response.json({ success: false, error: "Failed to initiate payment" }, { status: 500 });
    }
  } catch (err) {
    console.error("Server Error:", err);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
