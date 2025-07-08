
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LaunchChecklist from '@/components/LaunchChecklist';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Rocket, Users, Zap, Shield } from 'lucide-react';

const LaunchStatus = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Launch Status - Digital Intelligence Hub</title>
        <meta name="description" content="Check the launch readiness status of Digital Intelligence Hub" />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Launch Status</h1>
          <p className="text-xl text-gray-600">Digital Intelligence Hub - Production Readiness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Rocket className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Launch Ready</h3>
              <p className="text-sm text-gray-600">All systems operational</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">10K+ Users</h3>
              <p className="text-sm text-gray-600">Ready to scale</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">38 AI Tools</h3>
              <p className="text-sm text-gray-600">Fully functional</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure</h3>
              <p className="text-sm text-gray-600">RLS & Auth enabled</p>
            </CardContent>
          </Card>
        </div>

        <LaunchChecklist />

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Launch Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700">✅ Completed Features</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  <li>38 AI Tools with full functionality</li>
                  <li>User authentication and profiles</li>
                  <li>Team collaboration features</li>
                  <li>Learning hub with courses</li>
                  <li>Community forums</li>
                  <li>Marketplace for projects</li>
                  <li>Business insights dashboard</li>
                  <li>AI assistant integration</li>
                  <li>Search functionality</li>
                  <li>Responsive design</li>
                  <li>Privacy policy and terms of service</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700">🚀 Production Configuration</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  <li>Supabase database with Row Level Security</li>
                  <li>Edge functions for AI processing</li>
                  <li>Proper meta tags and SEO optimization</li>
                  <li>Error handling and monitoring</li>
                  <li>Performance optimization</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-orange-700">⚙️ Environment Setup Required</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                  <li>Set proper Site URL in Supabase Auth settings</li>
                  <li>Configure redirect URLs for production domain</li>
                  <li>Verify all secrets are set in Supabase</li>
                  <li>Test with real domain before final launch</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LaunchStatus;
