
import React, { useState } from "react";
import {
  ChevronLeft,
  Calendar,
  BarChart3,
  FileText,
  TrendingUp,
  Send,
  Settings,
  Plus,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AISocialMediaManagerInterfaceProps {
  onBack: () => void;
}

const suggestedPosts = [
  {
    platform: "Instagram",
    icon: Instagram,
    content: "🌾 Did you know? Our AI can optimize your crop yields effortlessly. #AgriAI",
    time: "Today, 11:00 AM",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    content: "Efficient farm management, powered by AI. Discover how automation saves you hours. 🚜💡 #SmartFarming",
    time: "Today, 2:45 PM",
  },
  {
    platform: "Facebook",
    icon: Facebook,
    content: "Share your farm's success story and let AI enhance your outreach! 📈👨‍🌾",
    time: "Tomorrow, 9:00 AM",
  },
];

const platforms = [
  { name: "Instagram", icon: Instagram, user: "@farm.agri" },
  { name: "Twitter", icon: Twitter, user: "@FarmGenAI" },
  { name: "Facebook", icon: Facebook, user: "AgriTech Solutions" },
];

const metrics = [
  { title: "Posts This Week", value: "15", icon: FileText },
  { title: "Engagement Rate", value: "9.4%", icon: TrendingUp },
  { title: "Followers Gained", value: "+1,430", icon: BarChart3 },
  { title: "Scheduled Posts", value: "6", icon: Calendar },
];

const AISocialMediaManagerInterface: React.FC<AISocialMediaManagerInterfaceProps> = ({ onBack }) => {
  const [draft, setDraft] = useState("");
  const [platform, setPlatform] = useState("Twitter");

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-purple-200 dark:border-purple-900 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/40 dark:via-pink-900/30 dark:to-indigo-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-purple-100 dark:hover:bg-purple-900/40">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-purple-900 dark:text-purple-100">
              AI Social Media Manager
            </h1>
            <p className="text-sm text-purple-700 dark:text-purple-200">
              Intelligent Social Campaign & Content Studio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50 dark:border-purple-600 dark:hover:bg-purple-900">
            <FileText className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Send className="mr-2 h-4 w-4" /> Post Now
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-purple-100 dark:hover:bg-purple-900/40">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-purple-200 dark:border-purple-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-300 mb-3 uppercase tracking-wider">
              Connected Platforms
            </h2>
            <div className="space-y-3">
              {platforms.map((plat) => (
                <div
                  key={plat.name}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-purple-50/50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800"
                >
                  <plat.icon className="h-5 w-5 text-purple-700 dark:text-purple-200" />
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{plat.name}</span>
                    <div className="text-xs text-purple-700 dark:text-purple-200">{plat.user}</div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full justify-start text-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/50 mt-1">
                <Plus className="h-4 w-4 mr-2" /> Add Platform
              </Button>
            </div>
          </div>
          <Separator className="bg-purple-200 dark:bg-purple-800" />
          <div>
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-300 mb-3 uppercase tracking-wider">
              Actions
            </h2>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-900 dark:text-purple-100">
                <Send className="h-4 w-4 mr-2" /> Quick Post
              </Button>
              <Button variant="outline" className="w-full justify-start border-purple-200 hover:bg-purple-50 dark:border-purple-600 dark:hover:bg-purple-900">
                <Calendar className="h-4 w-4 mr-2" /> View Calendar
              </Button>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-purple-50/60 via-pink-50/60 to-indigo-50/60 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((m) => (
                <Card key={m.title} className="border border-purple-100 dark:border-purple-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{m.title}</CardTitle>
                    <m.icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{m.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Content Calendar Placeholder */}
            <Card className="border border-purple-100 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900 dark:text-purple-100">
                  Content Calendar Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56 rounded-lg flex items-center justify-center border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-indigo-900/30">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-purple-500 dark:text-purple-300 mx-auto mb-2" />
                    <p className="text-purple-700 dark:text-purple-300 font-medium">AI-powered Content Planner</p>
                    <p className="text-sm text-purple-600 dark:text-purple-300">Easily schedule posts & campaigns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Suggested Posts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-900 dark:text-purple-100">
                    Suggested Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {suggestedPosts.map((post, i) => (
                      <div key={i} className="flex gap-3 items-center bg-purple-50/80 dark:bg-purple-900/20 rounded-lg p-3">
                        <post.icon className="h-5 w-5 text-purple-700 dark:text-purple-200" />
                        <div>
                          <p className="text-gray-900 dark:text-gray-100">{post.content}</p>
                          <span className="text-xs text-purple-700 dark:text-purple-200">{post.platform} • {post.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Post Composer */}
              <Card className="border border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-900 dark:text-purple-100">
                    Quick Post Composer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-3"
                    onSubmit={e => {
                      e.preventDefault();
                      // For demonstration, just clear input.
                      setDraft("");
                    }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Draft a post
                    </label>
                    <textarea
                      className="w-full rounded border border-purple-200 dark:border-purple-700 bg-white dark:bg-purple-950 px-3 py-2"
                      rows={3}
                      placeholder="What's on your mind?"
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      maxLength={200}
                    />
                    <div className="flex items-center gap-3">
                      <select
                        className="rounded border border-purple-200 dark:border-purple-700 bg-white dark:bg-purple-950 px-2 py-1"
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                      >
                        <option value="Twitter">Twitter</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                      </select>
                      <Button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        disabled={!draft}
                      >
                        <Send className="h-4 w-4 mr-1" /> Post
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        {/* Right Panel */}
        <aside className="w-80 border-l border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-950 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-wider mb-4">
            Account Insights
          </h2>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-6">
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">12,340</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">Total Followers</div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Avg. Likes</span>
                <span className="text-purple-700 dark:text-purple-200">147</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Avg. Comments</span>
                <span className="text-purple-700 dark:text-purple-200">25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Share Rate</span>
                <span className="text-purple-700 dark:text-purple-200">7.8%</span>
              </div>
            </div>
          </div>
          <Separator className="my-6 bg-purple-200 dark:bg-purple-800" />
          <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-wider mb-4">
            Activity Log
          </h2>
          <ul className="text-xs space-y-3">
            <li><span className="text-purple-800 dark:text-purple-200 font-medium">[Today]</span> Instagram post scheduled for 5PM.</li>
            <li><span className="text-purple-800 dark:text-purple-200 font-medium">[Yesterday]</span> Twitter campaign auto-reported.</li>
            <li><span className="text-purple-800 dark:text-purple-200 font-medium">[2d ago]</span> Facebook engagement up 120%.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default AISocialMediaManagerInterface;
