
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ledger-50 to-white z-0" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-ledger-100 rounded-full opacity-50 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-60 -right-20 w-40 h-40 bg-ledger-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-40 w-60 h-60 bg-ledger-100 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-ledger-100 text-ledger-800 mb-6 mx-auto lg:mx-0">
              <span className="animate-pulse bg-ledger-600 w-2 h-2 rounded-full mr-2"></span>
              Next-generation accounting software
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline animate-fade-in-up">Simplify accounting with</span>{' '}
              <span className="block text-ledger-700 xl:inline animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                LedgER Pro
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              A comprehensive double-entry accounting system designed for modern businesses. Manage sales, purchases, inventory, and payroll with statutory compliance built-in.
            </p>
            
            {/* CTA buttons */}
            <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="rounded-md shadow">
                <Button className="w-full flex items-center justify-center px-8 py-6 text-base font-medium rounded-lg text-white bg-ledger-700 hover:bg-ledger-800 md:py-6 md:text-lg">
                  Start free trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button variant="outline" className="w-full flex items-center justify-center px-8 py-6 text-base font-medium rounded-lg border-2 border-ledger-200 text-ledger-700 bg-white hover:bg-ledger-50 md:py-6 md:text-lg">
                  Watch demo
                </Button>
              </div>
            </div>
            
            {/* Trust badges */}
            <div className="mt-8 border-t border-gray-200 pt-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <p className="text-sm font-medium text-gray-500 text-center lg:text-left">
                Trusted by leading companies worldwide
              </p>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 flex items-center justify-center">
                    <div className="h-2 bg-gray-200 rounded w-16 sm:w-24"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Hero image/illustration */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md animate-fade-in">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <div className="w-full h-full bg-ledger-100 flex items-center justify-center">
                    <div className="p-8 flex flex-col items-center justify-center space-y-6">
                      {/* Dashboard mockup - replace this with an actual image later */}
                      <div className="w-full h-12 bg-ledger-700 rounded-md"></div>
                      <div className="w-full grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-24 bg-white rounded-md border border-ledger-200 shadow-sm"></div>
                        <div className="h-24 bg-white rounded-md border border-ledger-200 shadow-sm"></div>
                      </div>
                      <div className="w-full grid grid-cols-2 gap-4">
                        <div className="h-20 bg-white rounded-md border border-ledger-200 shadow-sm"></div>
                        <div className="h-20 bg-white rounded-md border border-ledger-200 shadow-sm"></div>
                      </div>
                      <div className="w-full h-28 bg-white rounded-md border border-ledger-200 shadow-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-lg font-medium text-ledger-800">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
