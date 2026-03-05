"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookEvent } from "@/services/participator/bookEvent";
import { IEvent } from "@/types/event.type";
import { useEffect } from "react";

interface EventCheckoutContentProps {
  event: IEvent;
  quantity: number;
}

export default function EventCheckoutContent({
  event,
  quantity,
}: EventCheckoutContentProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  const safeQuantity = useMemo(() => {
    const seats = Math.max(1, Number(event.availableSeats || 1));
    if (!Number.isInteger(quantity) || quantity < 1) return 1;
    return Math.min(quantity, seats);
  }, [event.availableSeats, quantity]);

  const totalAmount = Number(event.joiningFee) * safeQuantity;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          process.env.NEXT_PUBLIC_BASE_API_URL ||
          "http://localhost:5000/api/v1";

        const response = await fetch(`${apiUrl}/auth/me`, {
          credentials: "include",
        });
        const result = await response.json();
        const data = result?.data;

        setUser({
          name:
            data?.participator?.name ||
            data?.admin?.name ||
            data?.host?.name ||
            data?.name ||
            "N/A",
          email: data?.email || "N/A",
        });
      } catch {
        setUser({
          name: "N/A",
          email: "N/A",
        });
      }
    };

    loadUser();
  }, []);

  const handleProcessPayment = async () => {
    try {
      setIsProcessing(true);
      const result = await bookEvent(event.id, safeQuantity);

      if (!result?.success) {
        toast.error(result?.message || "Payment initiation failed");
        return;
      }

      if (!result?.data?.paymentUrl) {
        toast.error("Payment URL not found");
        return;
      }

      sessionStorage.setItem("paymentReturnUrl", `/events/${event.id}`);
      window.location.href = result.data.paymentUrl;
    } catch {
      toast.error("Failed to start payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <Card className="border-cyan-100">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold text-slate-800">User Information</h3>
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-semibold">{user?.name || "Loading..."}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold">{user?.email || "Loading..."}</p>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold text-slate-800">Event Information</h3>
              <div>
                <p className="text-sm text-slate-500">Event</p>
                <p className="font-semibold">{event.title}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-500">Unit Price</p>
                  <p className="font-semibold">
                    BDT {Number(event.joiningFee).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Quantity</p>
                  <p className="font-semibold">{safeQuantity}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="font-semibold">
                    BDT {totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/events/${event.id}`)}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isProcessing ? "Redirecting..." : "Process To Payment"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
