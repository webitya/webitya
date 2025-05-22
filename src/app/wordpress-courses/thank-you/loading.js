export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#21759b] mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing your order...</p>
      </div>
    </div>
  )
}
