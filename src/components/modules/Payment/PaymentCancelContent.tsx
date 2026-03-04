"use client";

import { bookEvent } from "@/services/participator/bookEvent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PaymentCancelContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!eventId) {
      toast.error("Event id not found");
      return;
    }

    try {
      setIsRetrying(true);
      const result = await bookEvent(eventId);

      if (!result?.success) {
        toast.error(result?.message || "Payment initiation failed");
        return;
      }

      if (!result?.data?.paymentUrl) {
        toast.error("Payment URL not found");
        return;
      }

      sessionStorage.setItem("paymentReturnUrl", `/events/${eventId}`);
      window.location.href = result.data.paymentUrl;
    } catch {
      toast.error("Failed to retry payment");
    } finally {
      setIsRetrying(false);
    }
  };

  const handleBackToEvent = () => {
    if (eventId) {
      router.push(`/events/${eventId}`);
      return;
    }
    router.push("/events");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-red-50 to-rose-50">
      <Card className="max-w-md w-full border-red-200 shadow-lg">
        <CardContent className="pt-8 pb-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative bg-red-100 rounded-full p-4">
                <AlertCircle className="h-20 w-20 text-red-600" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-red-900">
                Payment Cancelled
              </h1>
              <p className="text-red-700">
                Your ticket is not confirmed yet. Complete payment to join this
                event.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                disabled={isRetrying || !eventId}
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
              >
                {isRetrying ? "Redirecting..." : "Pay Again"}
              </Button>
              <Button
                onClick={handleBackToEvent}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Back To Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelContent;
