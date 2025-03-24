
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
          
          <div className="space-y-6">
            <div className="p-6 bg-muted/50 rounded-lg border">
              <h2 className="text-xl font-semibold mb-2">Welcome to our Community</h2>
              <p className="text-muted-foreground mb-4">
                Connect with other AI enthusiasts, share your experiences, and get help with your AI projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium">Discussion Topic {i}</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded">3 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    A brief preview of the discussion content goes here. This could be a question, a tip, or a story shared by a community member.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                      <span className="text-sm">Username</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>12 replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
