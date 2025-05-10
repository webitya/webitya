export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p className="text-gray-600">Please wait while we prepare your booking page...</p>
      </div>
    </div>
  )
}
