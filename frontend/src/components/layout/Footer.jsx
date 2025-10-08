import { BookOpen, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">StudyBox</span>
          </div>
          <p className="text-white/80">
            StudyBox is your ultimate learning platform. Structured resources, videos, and PDFs for students. Admins can manage content easily and effectively.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/browse" className="hover:text-primary transition-colors">Browse</Link></li>
            <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
            <li><Link to="/signup" className="hover:text-primary transition-colors">Sign Up</Link></li>
          </ul>
        </div>

        {/* Resources / Help */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><Link to="/student/search" className="hover:text-primary transition-colors">Search</Link></li>
            <li><Link to="/student/dashboard" className="hover:text-primary transition-colors">Student Dashboard</Link></li>
            <li><Link to="/admin/dashboard" className="hover:text-primary transition-colors">Admin Dashboard</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="flex items-center gap-2 text-white/80"><Mail className="h-4 w-4" /> support@studybox.com</p>
          <p className="flex items-center gap-2 text-white/80"><Phone className="h-4 w-4" /> +91 1234 567 890</p>
          <div className="mt-2">
            <h4 className="font-semibold mb-2">Subscribe</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l-full border-none focus:outline-none text-black" />
              <Button className="rounded-r-full bg-white text-primary hover:bg-white/90 px-4">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-white/70 text-sm">
        &copy; {new Date().getFullYear()} StudyBox. All rights reserved. Designed with ❤️ for students and educators.
      </div>
    </footer>
  );
};

export default Footer;


