import {   Star } from "lucide-react";
import { Button } from "@/components/ui/button";
 
import { SearchBar } from "./SearchBar";



export function Hero() {
  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const data = {
  //       symptoms: formData.get('symptoms') as string,
  //       specialty: formData.get('specialty') as string,
  //     };
  //     formCard.onSubmit?.(data);
  //   };

  return ( 
        <section className="relative bg-gradient-to-b from-[#f4f4f4] to-[#fff5f6] pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-200 blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-orange-200 blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
              <Star className="h-4 w-4 text-[#ff4000] fill-current" />
              <span className="text-sm font-medium text-gray-600">
                The #1 Event Management Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-[#444444] tracking-tight mb-6 leading-tight">
              Plan Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4000] to-[#b700ff]">
                Unforgettable Experience
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover, book, and manage events seamlessly. From intimate
              workshops to global conferences, we bring people together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                size="lg"
                className="shadow-lg shadow-orange-200 w-full sm:w-auto"
              >
                Find Events
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white"
              >
                Create Event
              </Button>
            </div>

            <SearchBar className="shadow-xl shadow-gray-200/50" />
          </div>
        </section>

  );
}
