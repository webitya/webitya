import Navbar from "@/components/layout/Navbar"
import EmailPreferences from "@/components/notifications/EmailPreferences"

export const metadata = {
  title: "Settings - Webitya LMS",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Customize your learning experience and notification preferences.</p>
        </div>

        <div className="space-y-8">
          <EmailPreferences />

          {/* Additional settings sections can be added here */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Account Security</h2>
            <div className="space-y-4">
              <a
                href="/reset-password"
                className="block w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Change Password
              </a>
              <button className="block w-full text-left px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
