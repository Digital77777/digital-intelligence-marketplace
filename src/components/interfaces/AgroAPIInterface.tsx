
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LightningFast } from "lucide-react";

const stats = [
  { value: "25K+", label: "Active Developers" },
  { value: "50M+", label: "API Calls/Month" },
  { value: "180+", label: "Countries Served" },
  { value: "99.9%", label: "Uptime SLA" }
];

const apis = [
  {
    name: "WeatherPro API",
    desc: "Seamless weather APIs with 12-day forecasting for smart crop management.",
    features: ["High-Fidelity Data", "Global Access", "Easy Integration"],
    tier: "Free tier: 1000 calls/month"
  },
  {
    name: "SoilSense API",
    desc: "Transformative soil insights to monitor pH, moisture, and nutrients.",
    features: ["Soil Profile Access", "Custom Alerts", "AI Monitoring"],
    tier: "Starting at $29/month"
  },
  {
    name: "SatVision API",
    desc: "Satellite imagery and NDVI analytics to monitor crop health, moisture & regions.",
    features: ["NDVI Monitoring", "High-Resolution", "AI Insights"],
    tier: "Starting at $49/month"
  }
];

const features = [
  { icon: "🔒", title: "Reliable & Secure", desc: "99.9% uptime SLA, plus enterprise grade security" },
  { icon: "⚡", title: "Lightning Fast", desc: "Global CDN ensures low-latency everywhere." },
  { icon: "💻", title: "Developer Friendly", desc: "Comprehensive docs and SDKs for all platforms." }
];

const AgroAPIInterface: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 pt-5 pb-12 bg-gradient-to-br from-[#e9f7ee] to-[#f4faf3] rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-green-900 mb-2">🌿 AgroAPI</h2>
      <span className="inline-block bg-green-100 text-green-700 font-semibold py-1 px-3 rounded-full mb-2 text-xs">🌱 New Weather API! Beta</span>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">The Agriculture API Hub</h3>
      <div className="text-gray-600 text-sm mb-4">
        Access premium agricultural data through our curated marketplace. From weather forecasts to soil analytics, power your AgriTech solution with reliable APIs.
      </div>
      <div className="flex gap-2 mb-4">
        <Button className="w-full bg-green-600 text-white hover:bg-green-700">Explore APIs</Button>
        <Button variant="outline" className="w-full border-green-100 text-green-700">View Documentation</Button>
      </div>
      <div className="flex gap-2 mb-4">
        <Badge className="bg-white text-green-700 border border-green-200 font-medium px-3 py-1">High-Quality Data</Badge>
        <Badge className="bg-white text-green-700 border border-green-200 font-medium px-3 py-1">Developer Friendly</Badge>
        <Badge className="bg-white text-green-700 border border-green-200 font-medium px-3 py-1">99.9% Uptime</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-lg bg-white border border-green-100 px-3 py-3 flex flex-col items-center">
            <span className="font-bold text-green-800 text-xl">{stat.value}</span>
            <span className="text-gray-500 text-xs">{stat.label}</span>
          </div>
        ))}
      </div>
      <h4 className="text-lg font-semibold text-green-900 mb-2 mt-6">Explore Agriculture APIs</h4>
      <div className="space-y-2">
        {apis.map(api => (
          <div key={api.name} className="bg-white border border-green-100 rounded-lg p-3 mb-2 shadow">
            <div className="font-semibold text-green-800">{api.name}</div>
            <div className="text-gray-600 text-xs mb-2">{api.desc}</div>
            <ul className="pl-4 list-disc text-xs text-green-900 mb-1">
              {api.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="text-xs text-green-700 mb-2">{api.tier}</div>
            <Button size="sm" className="w-full bg-green-600 text-white hover:bg-green-700">View Details</Button>
          </div>
        ))}
      </div>
      <div className="mt-8 mb-2">
        <h4 className="text-lg font-semibold text-green-900 mb-2">Why Choose AgroAPI Marketplace?</h4>
        <div className="space-y-2">
          {features.map(f => (
            <div key={f.title} className="flex items-center bg-white border border-green-100 rounded-lg px-3 py-2">
              <span className="text-xl mr-3">{f.icon}</span>
              <div>
                <div className="font-semibold text-green-800">{f.title}</div>
                <div className="text-xs text-gray-600">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-7">
        <Button className="bg-green-600 text-white hover:bg-green-700 w-full">Start Building</Button>
      </div>
    </div>
  );
};

export default AgroAPIInterface;
