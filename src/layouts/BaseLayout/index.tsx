import { Outlet, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BaseLayout = () => {
  // Get current location to check if we're on an example page
  const location = useLocation();
  const isExamplePage = location.pathname.includes('/examples/');
  
  // If on example page, extract the example name for the header

  return (
    <div className='max-w-7xl mx-auto px-4 font-sans'>
      {/* Header */}
      <header className="flex justify-between items-center py-5 border-b border-gray-200">
        <div className="flex items-center gap-3 text-2xl font-bold text-blue-600">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex justify-center items-center">
            <div className="w-4 h-4 bg-white rounded"></div>
          </div>
          <Link to="/" className="hover:opacity-90 transition-opacity">
            SensingHome
          </Link>
        </div>
        
        {/* Conditional navigation: show nav links on landing page, back button on example pages */}
        {isExamplePage ? (
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              <span className="font-medium">Back to Examples</span>
            </Link>
          </div>
        ) : (
          <nav className="flex gap-5">
            <a href="#examples" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors">Examples</a>
            <a href="#about" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors">About</a>
            <a href="#paper" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors">Research Paper</a>
            <a href="#" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1">
              GitHub
            </a>
          </nav>
        )}
      </header>
      
      {/* Main Content */}
      <Outlet />
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 flex justify-between items-center text-sm text-gray-600 mt-16">
        <div>© 2025 SensingHome Project. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;