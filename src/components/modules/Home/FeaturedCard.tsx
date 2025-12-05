import React from 'react'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
 
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
interface EventCardProps {
  id: string
  title: string
  date: string
  time: string
  location: string
  image: string
  price: string
  category: string
}
export function EventCard({
  id,
  title,
  date,
  time,
  location,
  image,
  price,
  category,
}: EventCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#ff4000] uppercase tracking-wide">
          {category}
        </div>
        <div className="absolute top-4 right-4 bg-[#303030]/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
          {price}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 text-[#ff4000]" />
          <span>{date}</span>
        </div>

        <h3 className="text-xl font-bold text-[#444444] mb-2 group-hover:text-[#ff4000] transition-colors line-clamp-2">
          {title}
        </h3>

        <div className="space-y-2 mb-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link href={`/events/${id}`}>
            <Button
              variant="outline"
               
              className="group-hover:bg-[#ff4000] group-hover:text-white group-hover:border-[#ff4000]"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
