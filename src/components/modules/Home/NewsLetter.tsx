"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm shadow-sm border mb-6">
          <Mail className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            Newsletter Subscription
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Stay Updated With Our
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
            Latest Events
          </span>
        </h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Subscribe to our newsletter and never miss upcoming events, exclusive
          offers, and platform updates.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            required
            className="h-12"
          />
          <Button className="h-12 px-8">
            Subscribe
          </Button>
        </form>

        {/* Footer text */}
        <p className="text-xs text-muted-foreground mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
