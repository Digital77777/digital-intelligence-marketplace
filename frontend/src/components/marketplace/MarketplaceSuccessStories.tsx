
import React from 'react';
import { DollarSign, Briefcase, TrendingUp } from 'lucide-react';

const MarketplaceSuccessStories: React.FC = () => {
  const successStats = [
    { stat: "$2.5M+", label: "Total Transactions", icon: <DollarSign className="w-6 h-6" /> },
    { stat: "15,000+", label: "Projects Completed", icon: <Briefcase className="w-6 h-6" /> },
    { stat: "98.5%", label: "Client Satisfaction", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
        <p className="text-muted-foreground text-lg">See how our AI marketplace transforms businesses</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {successStats.map((item, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600">
              {item.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</div>
            <div className="text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceSuccessStories;
