
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTA = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-ledger-700 to-ledger-900 z-0"></div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl max-w-3xl mx-auto">
              Ready to streamline your accounting processes?
            </h2>
            <p className="mt-4 text-xl text-ledger-100 max-w-2xl mx-auto">
              Join thousands of businesses that trust LedgER Pro for their accounting needs. Start your free trial today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-white text-ledger-800 hover:bg-ledger-50 border border-transparent px-8 py-6 text-base font-medium shadow-md">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-medium">
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
