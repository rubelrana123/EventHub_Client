import { Calendar, Shield, Users } from "lucide-react";
import { ChooseUsCard } from "./ChooseUsCard";

 
export default function ChooseUS() {
  return (
    <div>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#444444] mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide everything you need to create successful events and
                memorable experiences for your attendees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ChooseUsCard
                title="Smart Discovery"
                description="Our AI-powered recommendation engine helps you find events that match your professional interests and personal passions perfectly."
                icon={Calendar}
                color="blue"
              />
              <ChooseUsCard
                title="Seamless Booking"
                description="Experience a frictionless booking process with secure payments, instant confirmations, and digital ticket management."
                icon={Users}
                color="orange"
              />
              <ChooseUsCard
                title="Secure Platform"
                description="Your data and transactions are protected with enterprise-grade security. We prioritize your privacy and safety above all."
                icon={Shield}
                color="green"
              />
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#444444] mb-4">
                  Featured Events
                </h2>
                <p className="text-gray-600">
                  Explore our hand-picked selection of upcoming events.
                </p>
              </div>
              <Button variant="ghost" className="hidden sm:flex">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="mt-12 text-center sm:hidden">
              <Button variant="outline"  >
                View All Events
              </Button>
            </div>
          </div>
        </section> */}

    </div>
  )
}
