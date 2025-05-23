export async function createPayment(paymentData) {
  try {
    console.log("Creating payment with data:", paymentData)

    const response = await fetch("/api/wordpress-courses/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    console.log("Payment API response status:", response.status)

    const responseData = await response.json()
    console.log("Payment API response data:", responseData)

    if (!response.ok) {
      throw new Error(responseData.message || "Payment initialization failed")
    }

    return responseData
  } catch (error) {
    console.error("Payment creation error:", error)
    throw error
  }
}

export async function verifyPayment(transactionId) {
  try {
    const response = await fetch("/api/wordpress-courses/payments/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Payment verification failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Payment verification error:", error)
    throw error
  }
}

export async function getOrderDetails(orderId) {
  try {
    const response = await fetch(`/api/wordpress-courses/orders/${orderId}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to fetch order details")
    }

    return await response.json()
  } catch (error) {
    console.error("Order fetch error:", error)
    throw error
  }
}
