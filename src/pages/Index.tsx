
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, Database, BarChart3 } from 'lucide-react';
import TierSpecificContent from '@/components/TierSpecificContent';
import { useTier } from '@/context/TierContext';
import FeaturedResources from '@/components/FeaturedResources';
import TrendingToolsCarousel from '@/components/TrendingToolsCarousel';
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Sparkles, Users, BarChart, Code2, ShoppingCart, ArrowRight, ArrowDownRight, Shield, Star, MessageCircle } from "lucide-react";

const testimonials = [
  {
    name: "Sarah (Non-techie marketer)",
    quote: "I built and sold my first AI chatbot without coding. DIM made me a $3K/month solopreneur.",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    name: "Ajay, Fortune 500 Partner",
    quote: "Our team learned cutting-edge AI and launched new solutions for clients—fast and affordable.",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
];

const activityFeed = [
  { avatar: "https://randomuser.me/api/portraits/women/65.jpg", text: "@Jane just earned $200 deploying a sentiment analysis tool!" },
  { avatar: "https://randomuser.me/api/portraits/men/61.jpg", text: "@Dan enrolled in 'Prompt Engineering 101'" },
  { avatar: "https://randomuser.me/api/portraits/men/23.jpg", text: "@Alex sold a custom vision model to ACME Corp." },
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // For the "live activity feed" animation
  const [feedIndex, setFeedIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setFeedIndex((i) => (i + 1) % activityFeed.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tl from-[#f9fbfd] via-white to-[#eaf3fb] text-foreground font-inter">
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        {/* HERO SECTION */}
        <section className="relative py-20 md:py-28 px-4 bg-gradient-to-br from-[#e3edfc] via-white to-[#eaf3fb] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none">
            <div className="absolute top-0 left-20 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-70"></div>
            <div className="absolute right-0 top-32 w-44 h-44 bg-primary/30 rounded-full blur-3xl opacity-40"></div>
          </div>
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight bg-gradient-to-r from-[#105eb4] to-[#16e0b4] bg-clip-text text-transparent">
              Elevate Your Digital IQ: <br className="hidden sm:block" />
              <span className="font-black">Learn, Build, Monetize AI—All in One Place.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Step into a unified AI universe where anyone can <b>learn</b> future-ready skills, <b>build</b> without code, and <b>monetize</b> expertise—seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-2">
              <button
                className="bg-primary bg-gradient-to-r from-[#137cfc] to-[#21c7c9] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-md hover:scale-105 transition-all"
                onClick={() => navigate("/learning-hub")}
              >
                Start Your AI Journey
                <ArrowRight className="inline ml-2 mb-1" />
              </button>
              <button
                className="bg-white text-primary border border-primary font-semibold px-8 py-4 rounded-xl text-lg shadow hover:bg-blue-50 transition"
                onClick={() => navigate("/marketplace")}
              >
                Explore the Marketplace
                <ArrowDownRight className="inline ml-2 mb-1" />
              </button>
            </div>
          </div>
        </section>

        {/* VISUAL STORYTELLING: Journey steps */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="flex flex-col items-center group">
                <div className="bg-gradient-to-r from-[#8edcfb] to-[#33edba] p-4 rounded-full mb-4 shadow hover:scale-105 transition">
                  <Sparkles className="h-9 w-9 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold mb-1">Learn In-Demand AI Skills</h4>
                <p className="text-muted-foreground">Bite-sized, hands-on lessons for every level—no computer science degree needed.</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="bg-gradient-to-r from-[#c1affb] to-[#7fffd4] p-4 rounded-full mb-4 shadow hover:scale-105 transition">
                  <Code2 className="h-9 w-9 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-1">Build No-Code AI Solutions</h4>
                <p className="text-muted-foreground">Visually design, test, and launch AI tools with drag-and-drop simplicity.</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="bg-gradient-to-r from-[#fed7aa] to-[#82dfd1] p-4 rounded-full mb-4 shadow hover:scale-105 transition">
                  <ShoppingCart className="h-9 w-9 text-emerald-700" />
                </div>
                <h4 className="text-lg font-bold mb-1">Monetize in the Marketplace</h4>
                <p className="text-muted-foreground">Share your creations and skills—get discovered by global buyers and partners.</p>
              </div>
            </div>
            {/* Animated tool preview demo mockup */}
            <div className="mt-14 flex flex-col items-center">
              <div className="relative bg-gradient-to-tr from-[#eef8ff] to-[#eefcf7] rounded-3xl overflow-hidden border border-blue-100 p-8 shadow-md">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/70 to-accent" />
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold mb-4 text-primary">Interactive No-Code Tool Builder</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground list-inside">
                      <li>🟦 Drag & drop AI blocks</li>
                      <li>🌐 Instantly test your model</li>
                      <li>🚀 Publish directly to the Marketplace</li>
                    </ul>
                    <button className="mt-6 ai-btn px-5" onClick={() => navigate("/ai-studio")}>
                      Try the Demo (30s)
                    </button>
                  </div>
                  <div className="w-full max-w-[280px] h-[200px] md:block hidden rounded-xl bg-white shadow overflow-hidden border border-blue-100 flex items-center justify-center">
                    {/* Placeholder "animation" */}
                    <div className="animate-pulse h-full w-full flex flex-col justify-center items-center">
                      <Code2 className="h-11 w-11 text-primary mb-3" />
                      <div className="h-2 w-3/4 bg-blue-100 rounded mb-2 animate-pulse"></div>
                      <div className="h-2 w-1/2 bg-blue-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-2 w-2/3 bg-blue-50 rounded animate-pulse"></div>
                      <span className="mt-4 text-sm text-blue-500 animate-fade-in">Zero code. Real results.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FRICTIONLESS SIGN-UP: 3 steps */}
        <section className="py-16 px-2 bg-gradient-to-t from-white to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-6">Claim Your AI Future in 3 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:text-left text-center max-w-3xl mx-auto">
              <div>
                <div className="mx-auto md:mx-0 w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-xl font-bold text-primary mb-2 border border-blue-200">1</div>
                <p>Enter your email to start a personalized journey</p>
              </div>
              <div>
                <div className="mx-auto md:mx-0 w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-xl font-bold text-primary mb-2 border border-blue-200">2</div>
                <p>Get a 1-minute skill assessment and recommended tier</p>
              </div>
              <div>
                <div className="mx-auto md:mx-0 w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-xl font-bold text-primary mb-2 border border-blue-200">3</div>
                <p>Enjoy instant Freemium access (Basic/Pro if you qualify!)</p>
              </div>
            </div>
            <div className="mt-8">
              <button
                className="bg-gradient-to-r from-[#137cfc] to-[#21c7c9] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-md hover:scale-105 transition-all"
                onClick={() => navigate("/learning-hub")}
              >
                Claim Your AI Future
              </button>
            </div>
            <div className="text-sm text-muted-foreground mt-3">No credit card. No sales pitch. Your AI journey starts now.</div>
          </div>
        </section>

        {/* SOCIAL PROOF - Testimonials & Trust */}
        <section className="py-16 px-4 bg-white border-t border-blue-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl font-bold text-primary mb-12">They started right here—so can you</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
              {testimonials.map((t, i) => (
                <blockquote key={i} className="bg-blue-50 rounded-2xl p-8 shadow text-left flex-1 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.avatar} className="h-10 w-10 rounded-full border border-blue-200" alt={t.name} />
                    <span className="font-semibold text-primary">{t.name}</span>
                  </div>
                  <p className="italic text-md mb-2">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-6 justify-center items-center opacity-70">
              <span className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-white rounded-full border border-blue-100">
                <Shield className="h-4 w-4 text-primary" /> Backed by AWS
              </span>
              <span className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-white rounded-full border border-blue-100">
                <Star className="h-4 w-4 text-yellow-400" /> Featured in TechCrunch
              </span>
              <span className="inline-flex items-center gap-2 text-xs px-3 py-2 bg-white rounded-full border border-blue-100">
                <Users className="h-4 w-4 text-emerald-500" /> 10K+ innovators & creators
              </span>
            </div>
          </div>
        </section>

        {/* LIVE ACTIVITY & COMMUNITY */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50 ">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-primary">You belong here.</h2>
              <p className="text-md text-muted-foreground mb-6">Join a global movement. Learn with mentors, collaborate in teams, deploy real AI—with support at every step.</p>
              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-[#137cfc] to-[#21c7c9] text-white font-semibold px-7 py-3 rounded-lg shadow-md hover:scale-105 transition"
                  onClick={() => navigate("/community")}
                >
                  Meet the Community
                </button>
                <button
                  className="border border-primary text-primary bg-white font-semibold px-7 py-3 rounded-lg hover:bg-blue-50 transition"
                  onClick={() => navigate("/ai-assistant")}
                >
                  Try the AI Assistant
                </button>
              </div>
            </div>
            {/* Live Activity Feed */}
            <div className="flex-1 w-full max-w-md flex flex-col items-center">
              <div className="bg-white border border-blue-100 rounded-2xl shadow p-6 mb-4 w-full">
                <div className="mb-3 text-primary text-sm font-semibold flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" /> <span>Live Activity</span>
                </div>
                <div className="animate-fade-in flex items-center gap-4">
                  <img src={activityFeed[feedIndex].avatar} className="h-8 w-8 rounded-full border border-blue-200" alt="activity" />
                  <span className="text-blue-700">{activityFeed[feedIndex].text}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">See what members are doing now</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyFooter />

      {/* Styles for subtle keyframes */}
      <style>
        {`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .shadow-text {
          text-shadow: 0 2px 10px rgba(79, 70, 229, 0.2);
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .mb-safe {
          margin-bottom: env(safe-area-inset-bottom, 0);
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
};

export default Index;
