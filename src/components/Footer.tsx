import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gradient-to-r from-[#005ea8] to-[#0071c2] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-xl font-bold">Digital Intelligence Marketplace</h3>
                <p className="text-sm text-blue-100">Marketplace for AI Solutions</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4 max-w-md">
              Join 10K+ innovators learning AI, building projects, and growing their skills with our comprehensive platform of tools, courses, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@digitalintelligencehub.com" className="text-blue-100 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-tools-directory" className="text-blue-100 hover:text-white transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/learning-hub" className="text-blue-100 hover:text-white transition-colors">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-blue-100 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/community-forums" className="text-blue-100 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-blue-100 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-blue-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-blue-100 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@digitalintelligencehub.com" className="text-blue-100 hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="mailto:feedback@digitalintelligencehub.com" className="text-blue-100 hover:text-white transition-colors">
                  Send Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-400/30 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            © {new Date().getFullYear()} Digital Intelligence Hub. All rights reserved.
          </p>
          <p className="text-sm text-blue-200 mt-2">
            Empowering innovation through artificial intelligence
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;