import { Outlet, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BaseLayout = () => {
  // Get current location to check if we're on an example page
  const location = useLocation();
  const isExamplePage = location.pathname.includes('/examples/');
  
  // Smooth scroll function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 font-sans'>
      {/* Header */}
      <header className="flex justify-between items-center py-5 border-b">
        <div className="flex items-center gap-3 text-2xl font-bold text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex justify-center items-center">
            <div className="w-4 h-4 bg-primary-foreground rounded"></div>
          </div>
          <Link to="/" className="hover:opacity-90 transition-opacity">
            SensingHome
          </Link>
        </div>
        
        {/* Conditional navigation: show nav links on landing page, back button on example pages */}
        {isExamplePage ? (
          <div className="flex items-center">
            <Button variant="ghost" asChild>
              <Link to="/" className="gap-2">
                <ArrowLeft size={20} />
                Back to Examples
              </Link>
            </Button>
          </div>
        ) : (
          <nav className="flex-1 flex items-center justify-between ml-12">
            {/* Centered scroll navigation */}
            <div className="flex-1 flex justify-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="#examples"
                  onClick={(e) => handleSmoothScroll(e, '#examples')}
                >
                  Examples
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="#features"
                  onClick={(e) => handleSmoothScroll(e, '#features')}
                >
                  Features
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, '#about')}
                >
                  About
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="#paper"
                  onClick={(e) => handleSmoothScroll(e, '#paper')}
                >
                  Research
                </a>
              </Button>
            </div>
            
            {/* Right-aligned external links */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/user-guidance">User Guide</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to={"https://github.com/MrLoydHD/sensing_home_examples"} className="gap-1">
                  <Github size={16} />
                  GitHub
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </header>
      
      {/* Main Content */}
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground mt-16 gap-4">
        <div>© 2025 SensingHome Project. All rights reserved.</div>
        <div className="flex gap-2">
          <Button variant="link" size="sm" asChild>
            <a href="#">Privacy Policy</a>
          </Button>
          <Button variant="link" size="sm" asChild>
            <a href="#">Terms of Service</a>
          </Button>
          <Button variant="link" size="sm" asChild>
            <a href="#">Contact</a>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;