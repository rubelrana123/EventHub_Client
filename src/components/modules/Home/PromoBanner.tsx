import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function PromoBanner() {
  return (
    <div>
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] group">
              <Image
              height={500}
              width={500}
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80"
                alt="Soulfest Adelaide"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                <div className="px-8 md:px-16 max-w-2xl">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#ff4000] text-white text-sm font-bold mb-6">
                    Featured Festival
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    SOULFEST <br /> ADELAIDE
                  </h2>
                  <p className="text-gray-200 text-lg mb-8 max-w-md">
                    Experience the magic of music, art, and culture in one
                    spectacular weekend. Don&apos;t miss out on the event of the
                    year.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-[#444444] hover:bg-gray-100 border-none"
                  >
                    Get Tickets Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>        
    </div>
  )
}
