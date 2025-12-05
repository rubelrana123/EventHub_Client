"use client";
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Heart,
  User,
  Info,
  Tag,
  Star,
} from 'lucide-react'
import Image from 'next/image'
 
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
export default function EventDetailPage() {
  const { id } = useParams()
  // Mock data - in a real app this would come from an API based on the ID
  const event = {
    id : 1,
    title: 'Global Tech Summit 2024',
    date: 'October 15, 2024',
    time: '09:00 AM - 05:00 PM',
    location: 'Convention Center, San Francisco, CA',
    price: '$299',
    organizer: 'TechEvents Global',
    description: `Join us for the biggest technology conference of the year. The Global Tech Summit 2024 brings together industry leaders, innovators, and enthusiasts from around the world to explore the future of technology.
    
    This three-day event features keynote speeches from tech giants, interactive workshops, and networking opportunities that you won't find anywhere else. Whether you're a developer, designer, entrepreneur, or investor, this summit has something for everyone.
    
    Topics covered include Artificial Intelligence, Blockchain, Cloud Computing, Cybersecurity, and much more. Don't miss this opportunity to stay ahead of the curve and connect with the brightest minds in the industry.`,
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    tags: ['Technology', 'Innovation', 'Networking', 'AI', 'Future'],
  }
  return (
 
      <main className="flex-grow">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            height={500}
            width={500}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#ff4000] text-white text-xs font-bold rounded-full uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#ff4000]" />
                  <span className="font-medium">
                    Organized by {event.organizer}
                  </span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#ff4000] fill-current" />
                  <span className="font-medium">4.8 (120 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Event Info Bar */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-xl">
                    <Calendar className="h-6 w-6 text-[#ff4000]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Date & Time</h3>
                    <p className="text-gray-600 text-sm mt-1">{event.date}</p>
                    <p className="text-gray-500 text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <MapPin className="h-6 w-6 text-[#b700ff]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {event.location}
                    </p>
                    <a
                      href="#"
                      className="text-[#ff4000] text-sm font-medium hover:underline mt-1 inline-block"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <section>
                <h2 className="text-2xl font-bold text-[#444444] mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-[#ff4000]" />
                  About This Event
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  {event.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Tags */}
              <section>
                <h3 className="text-lg font-bold text-[#444444] mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-[#ff4000]" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Technology',
                    'Conference',
                    'Networking',
                    'Innovation',
                    'Startups',
                    'Silicon Valley',
                    'Future Tech',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500">Price per person</span>
                    <span className="text-3xl font-bold text-[#303030]">
                      {event.price}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">General Admission</span>
                      <span className="font-medium text-gray-900">
                        Available
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                      Only 45 tickets left!
                    </p>
                  </div>

                  <Button
                     
                    size="lg"
                    className="mb-4 shadow-lg shadow-orange-200"
                  >
                    Book Now
                  </Button>

                  <p className="text-center text-xs text-gray-400 mb-6">
                    No booking fees. 100% secure payment.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <Heart className="h-4 w-4" /> Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center gap-2"
                    >
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>

                {/* Organizer Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Organizer</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                      TE
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        TechEvents Global
                      </h4>
                      <p className="text-xs text-gray-500">Member since 2018</p>
                    </div>
                  </div>
                  <Button variant="ghost"   size="sm">
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}
