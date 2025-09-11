// Professional receipt generation utilities
import jsPDF from "jspdf"

export const generateReceiptPDF = (receiptData) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height

  const primaryColor = [31, 41, 55] // #1f2937 - Dark gray
  const accentColor = [99, 102, 241] // #6366f1 - Indigo
  const successColor = [16, 185, 129] // #10b981 - Green
  const grayColor = [75, 85, 99] // #4b5563 - Medium gray
  const lightGrayColor = [249, 250, 251] // #f9fafb - Very light gray

  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 70, "F")

  // Company logo and branding
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(36)
  doc.setFont("helvetica", "bold")
  doc.text("WEBITYA", 20, 35)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text("Webitya Web Services & ROI Agency", 20, 48)
  doc.text("Your Trusted Digital Partner", 20, 58)

  // Professional receipt badge
  doc.setFillColor(...accentColor)
  doc.roundedRect(pageWidth - 80, 15, 60, 25, 5, 5, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("OFFICIAL", pageWidth - 65, 25)
  doc.text("RECEIPT", pageWidth - 65, 33)

  // Receipt ID
  doc.setFontSize(8)
  doc.text(`#${receiptData.receiptId}`, pageWidth - 65, 45)

  // Main content area
  let yPosition = 90

  // Receipt title with enhanced styling
  doc.setTextColor(...primaryColor)
  doc.setFontSize(28)
  doc.setFont("helvetica", "bold")
  doc.text("PAYMENT RECEIPT", 20, yPosition)

  // Status badge with better positioning
  doc.setFillColor(...successColor)
  doc.roundedRect(pageWidth - 70, yPosition - 18, 50, 22, 5, 5, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("PAID", pageWidth - 55, yPosition - 5)

  yPosition += 35

  doc.setFillColor(...lightGrayColor)
  doc.rect(20, yPosition, pageWidth - 40, 75, "F")
  doc.setDrawColor(...grayColor)
  doc.setLineWidth(0.5)
  doc.rect(20, yPosition, pageWidth - 40, 75)

  doc.setTextColor(...primaryColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("CUSTOMER INFORMATION", 25, yPosition + 15)

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...grayColor)

  const customerDetails = [
    ["Name:", receiptData.customerName],
    ["Email:", receiptData.customerEmail],
    ["Phone:", receiptData.customerPhone],
    ...(receiptData.company ? [["Company:", receiptData.company]] : []),
    ...(receiptData.country ? [["Country:", receiptData.country]] : []),
  ]

  customerDetails.forEach(([label, value], index) => {
    const lineY = yPosition + 28 + index * 10
    doc.text(label, 25, lineY)
    doc.setTextColor(...primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text(value, 85, lineY)
    doc.setTextColor(...grayColor)
    doc.setFont("helvetica", "normal")
  })

  yPosition += 95

  doc.setFillColor(...lightGrayColor)
  const serviceHeight = receiptData.meetingDate ? 85 : 65
  doc.rect(20, yPosition, pageWidth - 40, serviceHeight, "F")
  doc.setDrawColor(...grayColor)
  doc.rect(20, yPosition, pageWidth - 40, serviceHeight)

  doc.setTextColor(...primaryColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("SERVICE DETAILS", 25, yPosition + 15)

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...grayColor)

  const serviceDetails = [
    ["Service:", receiptData.service],
    ...(receiptData.customServiceDescription ? [["Description:", receiptData.customServiceDescription]] : []),
    ...(receiptData.meetingDate ? [["Meeting Date:", receiptData.meetingDate]] : []),
    ["Payment Method:", receiptData.paymentMethod],
    ["Transaction Date:", `${receiptData.date} at ${receiptData.time}`],
  ]

  serviceDetails.forEach(([label, value], index) => {
    const lineY = yPosition + 28 + index * 10
    doc.text(label, 25, lineY)
    doc.setTextColor(...primaryColor)
    doc.setFont("helvetica", "bold")
    // Handle long text wrapping
    const maxWidth = pageWidth - 110
    const splitText = doc.splitTextToSize(value, maxWidth)
    doc.text(splitText, 85, lineY)
    doc.setTextColor(...grayColor)
    doc.setFont("helvetica", "normal")
  })

  yPosition += serviceHeight + 20

  doc.setFillColor(...accentColor)
  doc.rect(20, yPosition, pageWidth - 40, 70, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("PAYMENT SUMMARY", 25, yPosition + 18)

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")

  const paymentSummary = [
    ["Subtotal:", `${receiptData.currency} ${Number.parseFloat(receiptData.amount).toFixed(2)}`],
    ["Transaction Fee:", `${receiptData.currency} ${receiptData.transactionFee}`],
    ["Payment ID:", receiptData.paymentId],
    ["Transaction Status:", "Completed Successfully"],
  ]

  paymentSummary.forEach(([label, value], index) => {
    const lineY = yPosition + 30 + index * 10
    doc.text(label, 25, lineY)
    doc.setFont("helvetica", "bold")
    doc.text(value, 120, lineY)
    doc.setFont("helvetica", "normal")
  })

  yPosition += 90

  doc.setFillColor(...primaryColor)
  doc.rect(20, yPosition, pageWidth - 40, 35, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("TOTAL AMOUNT PAID:", 25, yPosition + 22)

  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  const totalAmount = `${receiptData.currency} ${Number.parseFloat(receiptData.amount).toLocaleString()}`
  doc.text(totalAmount, pageWidth - 20 - doc.getTextWidth(totalAmount), yPosition + 22)

  yPosition += 55

  doc.setTextColor(...grayColor)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")

  // Thank you message
  doc.setFont("helvetica", "bold")
  doc.text("Thank you for choosing Webitya!", 20, yPosition)
  doc.setFont("helvetica", "normal")

  // Receipt details
  doc.text(`Receipt generated on: ${new Date().toLocaleString()}`, 20, yPosition + 12)
  doc.text("This is a computer-generated receipt and does not require a signature.", 20, yPosition + 24)

  // Contact information - right aligned
  doc.setFont("helvetica", "bold")
  doc.text("Questions? Contact us:", pageWidth - 85, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text("Email: webitya@gmail.com", pageWidth - 85, yPosition + 12)
  doc.text("Website: webitya.com", pageWidth - 85, yPosition + 24)

  doc.setDrawColor(...grayColor)
  doc.setLineWidth(0.5)
  doc.line(20, yPosition + 35, pageWidth - 20, yPosition + 35)

  doc.setFontSize(8)
  doc.setTextColor(...grayColor)
  doc.text("© 2025 Webitya Web Services & ROI Agency. All rights reserved.", 20, yPosition + 45)

  return doc
}

export const downloadReceipt = (receiptData) => {
  const doc = generateReceiptPDF(receiptData)
  doc.save(`Webitya-Receipt-${receiptData.receiptId}.pdf`)
}

export const emailReceipt = async (receiptData, emailAddress) => {
  // This would integrate with your email service
  // For now, we'll just generate and download
  const doc = generateReceiptPDF(receiptData)
  const pdfBlob = doc.output("blob")

  // In a real implementation, you'd send this blob via email
  console.log("Receipt generated for email:", emailAddress)
  return pdfBlob
}
