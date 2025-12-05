import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react' 
import { EventCard } from './FeaturedCard'

export default function FeaturedEvent() {

      const events = [
    {
      id: '1',
      title: 'Global Tech Summit 2024',
      date: 'Oct 15, 2024',
      time: '09:00 AM - 05:00 PM',
      location: 'Convention Center, San Francisco',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      price: '$299',
      category: 'Technology',
    },
    {
      id: '2',
      title: 'Creative Design Workshop',
      date: 'Oct 20, 2024',
      time: '10:00 AM - 04:00 PM',
      location: 'Design Hub, New York',
      image:
        'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=800&q=80',
      price: '$149',
      category: 'Workshop',
    },
    {
      id: '3',
      title: 'Future of Business Conference',
      date: 'Nov 05, 2024',
      time: '08:30 AM - 06:00 PM',
      location: 'Business Park, London',
      image:
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      price: '$399',
      category: 'Business',
    },
    {
      id: '4',
      title: 'Digital Marketing Expo',
      date: 'Nov 12, 2024',
      time: '09:00 AM - 05:00 PM',
      location: 'Expo Center, Berlin',
      image:
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      price: '$199',
      category: 'Marketing',
    },
    {
      id: '5',
      title: 'Startup Networking Night',
      date: 'Nov 18, 2024',
      time: '06:00 PM - 09:00 PM',
      location: 'Innovation Lab, Austin',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      price: 'Free',
      category: 'Networking',
    },
    {
      id: '6',
      title: 'AI & Machine Learning Summit',
      date: 'Dec 02, 2024',
      time: '09:00 AM - 06:00 PM',
      location: 'Tech Campus, Seattle',
      image:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      price: '$499',
      category: 'Technology',
    },
  ]
  return (
    <div>
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
        </section>        
    </div>
  )
}
