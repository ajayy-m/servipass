import { useState } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Layout = ({ children }) => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`text-gray-800 hover:text-blue-600 font-medium transition duration-150 ${
                    location === item.href ? "text-blue-600" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Authentication Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="link" className="text-blue-600 hover:text-blue-700">
                Log in
              </Button>
              <Button>
                Sign up
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="md:hidden flex flex-col">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-gray-800 hover:text-blue-600 font-medium text-lg ${
                        location === item.href ? "text-blue-600" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Button variant="link" className="text-blue-600 w-full justify-start px-0">
                      Log in
                    </Button>
                    <Button className="w-full mt-2">
                      Sign up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <Logo variant="footer" />
              </Link>
              <p className="text-gray-400 mb-4">
                Simplifying home services through convenient subscription plans. One platform for all your maintenance needs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li><Link href="/services?category=1" className="text-gray-400 hover:text-white">Cleaning Services</Link></li>
                <li><Link href="/services?category=2" className="text-gray-400 hover:text-white">Maintenance Services</Link></li>
                <li><Link href="/services?category=3" className="text-gray-400 hover:text-white">Repair Services</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white">All Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                  <span>1234 Service Avenue, Suite 567<br/>Maintenance City, MC 12345</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3"></i>
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  <span>info@servipass.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {year} ServiPass. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;