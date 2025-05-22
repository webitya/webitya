export async function createPayment(paymentData) {
  try {
    const clientId = "TEST-M23OB63X1HCOD_25052";
    const clientSecret = "YTVhYTFjZktNOZmMi00ZTJiLWE5MzY1NzZjMTdhMTM4Zjcx";

    console.log("Creating payment with PhonePe", {
      clientId,
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      customerDetails: {
        name: paymentData.customerName,
        email: paymentData.customerEmail,
        phone: paymentData.customerPhone,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      paymentUrl: `https://phonepe.com/pay/${paymentData.orderId}`,
      message: "Payment link generated successfully",
      transactionId: `TXN_${Date.now()}`,
    };
  } catch (error) {
    console.error("Payment creation error:", error);
    throw error;
  }
}

export async function verifyPayment(transactionId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      status: "COMPLETED",
      message: "Payment verified successfully",
    };
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error;
  }
}

export async function getOrderDetails(orderId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      orderId,
      amount: 999,
      status: "PAID",
      customer: {
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "1234567890",
      },
    };
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}
