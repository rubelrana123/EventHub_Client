import React from 'react'
import { Calendar, MapPin, MoreVertical, Edit2, Trash2 } from 'lucide-react'
 
import Image from 'next/image'
 
import { Button } from '@/components/ui/button'
import { Card } from '@/components/shared/Card'
export interface EventData {
  id: string
  title: string
  date: string
  location: string
  description: string
  imageUrl?: string
  status: 'upcoming' | 'past' | 'draft'
}
interface EventCardProps {
  event: EventData
  onEdit: (event: EventData) => void
  onDelete: (id: string) => void
}
export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <Card
      className="group hover:shadow-md transition-shadow duration-200"
       
    >
      {/* Image Area */}
      <div className="relative h-40 w-full bg-gray-200 overflow-hidden">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            height={500}
            width={500}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            <Calendar className="h-12 w-12 opacity-20" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`
            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm
            ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : event.status === 'past' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}
          `}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>

        {/* Actions Menu (visible on hover/focus) */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(event)
            }}
            className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600"
            aria-label="Edit event"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(event.id)
            }}
            className="p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 text-red-600"
            aria-label="Delete event"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="text-lg font-bold text-[#444444] mb-2 line-clamp-1"
          title={event.title}
        >
          {event.title}
        </h3>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">
          {event.description}
        </p>

        <Button
          variant="outline"
          size="sm"
           
          onClick={() => onEdit(event)}
        >
          View Details
        </Button>
      </div>
    </Card>
  )
}
