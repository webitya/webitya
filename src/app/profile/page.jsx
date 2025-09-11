import Navbar from "@/components/layout/Navbar"
import UserProfile from "@/components/profile/UserProfile"

export const metadata = {
  title: "Profile - Webitya LMS",
  description: "Manage your profile and account settings",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences.</p>
        </div>

        <UserProfile />
      </div>
    </div>
  )
}
