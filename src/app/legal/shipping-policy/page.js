import { FaShippingFast } from "react-icons/fa";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaShippingFast className="text-blue-600 text-3xl" />
          <h1 className="text-3xl font-bold text-gray-900">Shipping Policy</h1>
        </div>

        <p className="text-gray-700 leading-7 mb-6">
          The orders for the user are shipped through registered domestic courier
          companies and/or speed post only. Orders are shipped within <span className="font-semibold">3 to 7 days</span> 
          from the date of the order and/or payment, or as per the delivery date
          agreed at the time of order confirmation and delivery of the shipment,
          subject to courier company / post office norms.
        </p>

        <p className="text-gray-700 leading-7 mb-6">
          Webitya Web Services shall not be liable for any delay in delivery by the
          courier company or postal authority. Delivery of all orders will be made
          to the address provided by the buyer at the time of purchase.
        </p>

        <p className="text-gray-700 leading-7 mb-6">
          Delivery of our services will be confirmed on your email ID as specified
          at the time of registration.
        </p>

        <p className="text-gray-700 leading-7 mb-6">
          If there are any shipping cost(s) levied by the seller or Webitya (as the
          case may be), the same is <span className="font-semibold">non-refundable</span>.
        </p>

        <p className="text-gray-700 leading-7">
          For any issues in utilizing our services, you may contact our helpdesk at{" "}
          <a
            href="mailto:support@webitya.com"
            className="text-blue-600 underline"
          >
            support@webitya.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
