
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PdfUploadFeature = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left side: Illustration */}
          <div className="lg:col-span-6 mb-10 lg:mb-0 order-2 lg:order-1">
            <div className="bg-ledger-50 rounded-3xl p-8 shadow-inner">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="bg-ledger-700 text-white px-6 py-4 flex items-center justify-between">
                  <h4 className="font-medium">Upload Purchase Invoice</h4>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-ledger-100 text-ledger-700 mb-4">
                      <Upload className="h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900">Upload Purchase Invoice PDF</h4>
                    <p className="mt-2 text-gray-500">Drag and drop files here, or click to browse</p>
                    <Button className="mt-4 bg-ledger-700 hover:bg-ledger-800">Select File</Button>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm font-medium text-gray-500 mb-3">Recently Uploaded</div>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-ledger-100 rounded-md text-ledger-700">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">Invoice-ABC-123.pdf</div>
                            <div className="text-xs text-gray-500">2.3 MB • Uploaded 2 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-green-500">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-ledger-100 rounded-md text-ledger-700">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">PO-XYZ-987.pdf</div>
                            <div className="text-xs text-gray-500">1.7 MB • Processing...</div>
                          </div>
                        </div>
                        <div className="text-amber-500">
                          <div className="h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side: Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-ledger-100 text-ledger-800 mb-4">
                <span className="mr-2 text-ledger-700">✨</span>
                New Feature
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Streamline Purchase Recording with PDF Upload
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-3xl">
                Save time and eliminate manual data entry. Simply upload your purchase invoices as PDFs, and LedgER Pro will automatically extract and record the transaction details.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Intelligent Data Extraction</h4>
                    <p className="text-gray-500">Our system uses advanced OCR to accurately extract vendor details, amounts, tax information, and more.</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Automatic Journal Entries</h4>
                    <p className="text-gray-500">The system creates proper double-entry records with correct account allocations, tax calculations, and TDS deductions.</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">Digital Record Keeping</h4>
                    <p className="text-gray-500">All uploaded documents are securely stored and linked to their corresponding transactions for easy reference.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="bg-ledger-700 hover:bg-ledger-800">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdfUploadFeature;
