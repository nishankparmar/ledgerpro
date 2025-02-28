
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      content: "LedgER Pro has transformed our accounting processes. The double-entry system ensures our books are always balanced, and the statutory compliance features save us countless hours each month.",
      author: "Rajiv Sharma",
      position: "CFO, Innovate Solutions Ltd."
    },
    {
      content: "The PDF upload feature for processing purchase invoices is a game-changer. What used to take our team hours now happens in minutes, with greater accuracy.",
      author: "Priya Patel",
      position: "Accounts Manager, Global Traders"
    },
    {
      content: "As a growing business, we needed an accounting solution that could scale with us. LedgER Pro not only met our current needs but has features we'll grow into as we expand.",
      author: "Vikram Malhotra",
      position: "Founder, TechStart Solutions"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-ledger-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-ledger-200 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by businesses across industries
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xl font-medium text-white mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-ledger-600 flex items-center justify-center text-white font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-ledger-200 text-sm">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -translate-y-1/2 px-2">
            <button 
              onClick={prevTestimonial} 
              className="h-10 w-10 rounded-full bg-ledger-600/80 backdrop-blur flex items-center justify-center text-white hover:bg-ledger-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial} 
              className="h-10 w-10 rounded-full bg-ledger-600/80 backdrop-blur flex items-center justify-center text-white hover:bg-ledger-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-3 w-3 rounded-full transition-all focus:outline-none",
                  index === activeIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
