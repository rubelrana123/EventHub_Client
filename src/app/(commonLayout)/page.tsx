 
import ChooseUS from '@/components/modules/Home/ChooseUS'
import FeaturedEvent from '@/components/modules/Home/FeaturedEvent'
import { Hero } from '@/components/modules/Home/Hero'
import Newsletter from '@/components/modules/Home/NewsLetter'
import PromoBanner from '@/components/modules/Home/PromoBanner'
import Testimonials from '@/components/modules/Home/Testimonials'
import { Button } from '@/components/ui/button' 
import Image from 'next/image'
export default function HomePage() {
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
 
      <main className="flex-grow">
 
      <Hero/>
      <ChooseUS/>
      <PromoBanner/>
      <FeaturedEvent/>
      <Testimonials/>
      <Newsletter/>
 
      </main>
 
    </div>
  )
}
