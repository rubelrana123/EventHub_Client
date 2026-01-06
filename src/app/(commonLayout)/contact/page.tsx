"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import Newsletter from "@/components/modules/Home/NewsLetter";

const Contact = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Get in Touch With
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
              EventHub
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question, feedback, or need help? Our team is here to help you
            make your events successful.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground text-sm">
                  support@eventhub.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-muted-foreground text-sm">
                  +880 1234 567 890
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Office</h4>
                <p className="text-muted-foreground text-sm">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" required />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Subject</Label>
                <Input placeholder="How can we help?" required />
              </div>

              <div className="space-y-1">
                <Label>Message</Label>
                <Textarea
                  placeholder="Write your message here..."
                  rows={5}
                  required
                />
              </div>

              <Button className="w-full h-12">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Newsletter   />
    </section>
  );
};

export default Contact;
