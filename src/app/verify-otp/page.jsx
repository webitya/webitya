import { Suspense } from "react";
import OTPVerification from "@/components/notifications/OTPVerification";

export const metadata = {
  title: "Verify Email - Webitya LMS",
  description: "Verify your email address to complete registration",
};

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading verification screen...</div>}>
      <OTPVerification />
    </Suspense>
  );
}
