
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';

const Courses = () => {
  const { currentTier } = useTier();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Courses & Learning Hub</h1>
          
          {currentTier === 'freemium' ? (
            <div className="space-y-6">
              <div className="p-6 bg-muted/50 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Limited Access</h2>
                <p className="text-muted-foreground mb-4">
                  You're currently on the Freemium plan, which gives you access to a limited selection of courses.
                </p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Basic or Pro to access the full library of courses and learning resources.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-medium mb-2">AI Basics Course {i}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      A beginner-friendly course to help you understand and use AI tools effectively.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Free</span>
                      <button className="text-sm text-primary hover:underline">Start learning</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p>Full access content for {currentTier} tier</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
