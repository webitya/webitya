import { FaRegCheckCircle } from 'react-icons/fa';

export default function ReturnPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Return & Exchange Policy</h1>

      <p className="mb-6 text-lg">
        We offer refund / exchange within the first <strong>7 days</strong> from the date of your purchase. If <strong>7 days</strong> have passed since your purchase, you will not be offered a return, exchange, or refund of any kind.
      </p>

      <div className="space-y-5 text-base leading-7">
        <p className="flex items-start gap-2">
          <FaRegCheckCircle className="text-green-500 mt-1" />
          In order to become eligible for a return or an exchange:
        </p>
        <ul className="list-disc pl-10 text-gray-700 space-y-2">
          <li>The purchased item should be unused and in the same condition as you received it.</li>
          <li>The item must have its original packaging.</li>
          <li>If the item was purchased on sale, it may not be eligible for return or exchange.</li>
        </ul>

        <p className="flex items-start gap-2">
          <FaRegCheckCircle className="text-green-500 mt-1" />
          Only items found defective or damaged will be replaced by us (based on an exchange request).
        </p>

        <p className="flex items-start gap-2">
          <FaRegCheckCircle className="text-green-500 mt-1" />
          If you need to place a return or exchange request for an eligible product/item, please send us an email at <a href="mailto:support@webitya.com" className="text-blue-600 underline">support@webitya.com</a>.
        </p>

        <p className="flex items-start gap-2">
          <FaRegCheckCircle className="text-green-500 mt-1" />
          You agree that certain categories of products/items may be exempt from returns or refunds. These will be clearly identified at the time of purchase.
        </p>

        <p className="flex items-start gap-2">
          <FaRegCheckCircle className="text-green-500 mt-1" />
          For accepted return or exchange requests: once your returned product/item is received and inspected by our team, we will notify you via email. If your return is approved after our quality check, it will be processed in accordance with our return/exchange policy.
        </p>
      </div>

      <p className="mt-10 text-sm text-gray-500 text-center">
        For any further questions, feel free to reach us at <a href="mailto:support@webitya.com" className="text-blue-600 underline">support@webitya.com</a>.
      </p>
    </div>
  );
}
