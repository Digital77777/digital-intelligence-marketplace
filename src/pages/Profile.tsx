
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { currentTier } = useTier();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Dashboard</h1>
              <p className="text-muted-foreground">
                Current Plan: <span className="font-medium capitalize">{currentTier}</span>
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-4">AI Tools Used</h3>
                  <div className="text-3xl font-bold">0</div>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-4">Courses Started</h3>
                  <div className="text-3xl font-bold">0</div>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-medium mb-4">Forum Posts</h3>
                  <div className="text-3xl font-bold">0</div>
                </div>
              </div>
              
              <div className="p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="text-center py-6 text-muted-foreground">
                  No recent activity to display
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6 mt-6">
              <div className="p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Saved AI Tools</h3>
                <div className="text-center py-6 text-muted-foreground">
                  You haven't saved any AI tools yet
                </div>
              </div>
              
              <div className="p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Saved Courses</h3>
                <div className="text-center py-6 text-muted-foreground">
                  You haven't saved any courses yet
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-6 mt-6">
              <div className="p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Your Activity</h3>
                <div className="text-center py-6 text-muted-foreground">
                  No activity to display
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="w-full p-2 rounded-md border" placeholder="your.email@example.com" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" className="w-full p-2 rounded-md border" placeholder="Your Name" />
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
