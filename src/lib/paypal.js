// PayPal configuration and utilities
export const paypalConfig = {
  client_id: process.env.PAYPAL_CLIENT_ID || "AedrEciU_hJNdVSEJgwRmnA5HDDM1HNchHB5IGVHP5I",
  client_secret: process.env.PAYPAL_CLIENT_SECRET || "EEZUJoHQcQfW5IzjL6Jwtn6pWLq73J40pmjrcz_N5s3Jw",
  base_url: process.env.NODE_ENV === "production" ? "https://api.paypal.com" : "https://api.sandbox.paypal.com",
}

export const getPayPalAccessToken = async () => {
  const auth = Buffer.from(`${paypalConfig.client_id}:${paypalConfig.client_secret}`).toString("base64")

  const response = await fetch(`${paypalConfig.base_url}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export const createPayPalOrder = async (amount, currency = "USD") => {
  try {
    const accessToken = await getPayPalAccessToken()

    const response = await fetch(`${paypalConfig.base_url}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toString(),
            },
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/paypal-success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/paypal-cancel`,
          brand_name: "WEBITYA",
          landing_page: "BILLING",
          user_action: "PAY_NOW",
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`PayPal API Error: ${data.error || data.message || "Unknown error"}`)
    }

    return data
  } catch (error) {
    console.error("PayPal order creation error:", error)
    throw error
  }
}

export const capturePayPalOrder = async (orderId) => {
  const accessToken = await getPayPalAccessToken()

  const response = await fetch(`${paypalConfig.base_url}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  return await response.json()
}
