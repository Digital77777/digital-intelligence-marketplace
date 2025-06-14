
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Digital Intelligence
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Marketplace for AI Solutions
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Empowering individuals and businesses with cutting-edge AI tools and technologies. 
              Access the future of artificial intelligence today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:contact@digitalintelligence.ai" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-tools-directory" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/learning-hub" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="mailto:support@digitalintelligence.ai" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} Digital Intelligence Marketplace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
