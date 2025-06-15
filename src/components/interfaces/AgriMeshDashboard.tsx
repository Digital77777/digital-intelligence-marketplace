
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const liveReports = [
  {
    user: "Ram Kumar",
    alert: "Brown Plant Hopper",
    region: "Rice in Kottayam",
    label: "Brown Plant Hopper",
    labelClass: "bg-red-100 text-red-700",
    time: "2 hours ago"
  },
  {
    user: "Priya Nair",
    alert: "Excellent Yield",
    region: "Coconut in Alappuzha",
    label: "Excellent Yield",
    labelClass: "bg-green-100 text-green-800",
    time: "4 hours ago"
  },
  {
    user: "Mohan Das",
    alert: "Fungal Disease",
    region: "Pepper in Wayanad",
    label: "Fungal Disease",
    labelClass: "bg-orange-100 text-orange-700",
    time: "6 hours ago"
  }
];

const AgriMeshDashboard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 pb-8 pt-6 rounded-xl bg-gradient-to-br from-[#f8fcfa] to-[#edf5ef] shadow-lg mt-10">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h2 className="text-2xl font-bold text-green-800">AgriMesh</h2>
          <div className="text-xs text-green-700 font-semibold">Hyperlocal Crop Intelligence</div>
        </div>
        <Badge className="bg-green-100 text-green-800 font-semibold rounded-xl px-3 py-1 text-xs shadow-none">Kerala Region</Badge>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mt-4">Regional Dashboard</h3>
      <div className="text-green-900 mb-3 text-sm">Real-time insights from your farming community</div>

      <div className="grid grid-cols-2 gap-2 my-3">
        <div className="bg-white shadow border border-green-50 rounded-lg px-3 py-2 flex flex-col items-center">
          <span className="text-2xl font-bold text-green-700">1247</span>
          <span className="text-xs text-gray-500">Active Farmers</span>
        </div>
        <div className="bg-white shadow border border-yellow-50 rounded-lg px-3 py-2 flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-700">43</span>
          <span className="text-xs text-gray-500">Reports Today</span>
        </div>
        <div className="bg-white shadow border border-orange-50 rounded-lg px-3 py-2 flex flex-col items-center">
          <span className="text-2xl font-bold text-orange-600">14</span>
          <span className="text-xs text-gray-500">Regions</span>
        </div>
        <div className="bg-white shadow border border-blue-50 rounded-lg px-3 py-2 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700">2.3 hrs</span>
          <span className="text-xs text-gray-500">Avg Response</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4 mb-2">
        <Button variant="secondary" className="rounded-full bg-yellow-50 text-yellow-700 font-semibold shadow-none px-3 py-1 text-xs">Recent Reports</Button>
        <Button variant="outline" className="rounded-full text-gray-600 font-semibold shadow-none border-0 px-3 py-1 text-xs">Crop Trends</Button>
        <Button variant="outline" className="rounded-full text-gray-600 font-semibold shadow-none border-0 px-3 py-1 text-xs">AI Insights</Button>
      </div>

      <div className="bg-green-50 border border-green-100 p-3 rounded-xl mb-4 mt-2 shadow">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-green-700">🌱</span>
          <span className="font-medium text-green-800">Welcome to AgriMesh!</span>
        </div>
        <div className="text-xs text-green-900 mb-3">
          Start sharing your crop insights and connect with nearby farmers to build a stronger agricultural community.
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">Submit Report</Button>
          <Button size="sm" variant="link" className="text-green-900 px-0">Dismiss</Button>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold text-gray-700 mb-1">Live Feed</h4>
        <div className="space-y-2 mb-3">
          {liveReports.map((rep, i) => (
            <div key={i} className="bg-white px-3 py-2 rounded-lg flex flex-col shadow border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">{rep.user}</span>
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-lg font-medium ${rep.labelClass}`}>
                  {rep.label}
                </span>
                <span className="ml-auto h-2 w-2 rounded-full" style={{ backgroundColor: i === 0 ? "#ef4444" : i === 1 ? "#22c55e" : "#f59e42" }}></span>
              </div>
              <div className="text-xs text-gray-500">{rep.region}</div>
              <div className="text-xs text-gray-400">{rep.time}</div>
            </div>
          ))}
        </div>
        <Button variant="secondary" className="w-full bg-yellow-50 text-yellow-700 mt-1 hover:bg-yellow-100">View All Reports</Button>
      </div>
    </div>
  );
};

export default AgriMeshDashboard;
