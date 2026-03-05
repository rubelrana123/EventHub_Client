"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { revalidate } from "@/lib/revalidate";
import { CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const returnUrlRef = useRef("/dashboard/my-events");

  useEffect(() => {
    // Refresh participator pages that are cached by tag.
    revalidate("my-event");
    revalidate("my-events");

    const eventId = searchParams.get("eventId");
    const storedUrl =
      sessionStorage.getItem("paymentReturnUrl") ||
      (eventId ? `/events/${eventId}` : "/dashboard/my-events");

    returnUrlRef.current = storedUrl;
    sessionStorage.removeItem("paymentReturnUrl");

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.push("/dashboard/my-events");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router, searchParams]);

  const handleManualRedirect = () => {
    router.push(returnUrlRef.current);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-50">
      <Card className="max-w-md w-full border-green-200 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-green-100 rounded-full p-4">
                  <CheckCircle2 className="h-20 w-20 text-green-600" />
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-green-900">
                Payment Successful!
              </h1>
              <p className="text-green-700">
                Your Event has been confirmed and payment received.
              </p>
            </div>

            {/* Details */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-800">
                A confirmation email has been sent to your registered email
                address with event details.
              </p>
            </div>

            {/* Countdown */}
            <div className="text-sm text-green-600">
              Redirecting to your event in {countdown} seconds...
            </div>

            {/* Action Button */}
            <Button
              onClick={handleManualRedirect}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              View My Events
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessContent;
