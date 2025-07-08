
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, Upload, Settings, Download, RotateCcw, Zap, Globe } from "lucide-react";

interface AIMarketplacePublisherInterfaceProps {
  onBack?: () => void;
}

const DEMO_PRODUCTS = [
  { name: "Smart Analytics Tool", category: "Data Science", status: "published", sales: "127" },
  { name: "Content Generator Pro", category: "Marketing", status: "pending", sales: "0" },
  { name: "Image Recognition API", category: "Computer Vision", status: "draft", sales: "43" }
];

const AIMarketplacePublisherInterface: React.FC<AIMarketplacePublisherInterfaceProps> = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productData, setProductData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handlePublish = async () => {
    if (!selectedProduct || !productData.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Product "${selectedProduct}" has been successfully processed and prepared for marketplace publication. Listing optimized with SEO keywords and compliance checks completed.`);
      setLoading(false);
    }, 2200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-emerald-100 dark:border-emerald-900/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">AI Marketplace Publisher</h1>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" className="border-emerald-200 dark:border-emerald-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-emerald-200 dark:border-emerald-700">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex gap-6 p-6">
        {/* Products Sidebar */}
        <div className="w-80 space-y-4">
          <Card className="border-emerald-100 dark:border-emerald-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-900 dark:text-emerald-100 text-lg">
                Your Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {DEMO_PRODUCTS.map((product, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedProduct === product.name
                      ? "border-emerald-300 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700"
                  }`}
                  onClick={() => setSelectedProduct(product.name)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h4>
                    <Badge variant={product.status === "published" ? "default" : product.status === "pending" ? "secondary" : "outline"}>
                      {product.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Category: {product.category}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sales: {product.sales}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Publishing Area */}
        <div className="flex-1 space-y-6">
          <Card className="border-emerald-100 dark:border-emerald-700">
            <CardHeader>
              <CardTitle className="text-emerald-900 dark:text-emerald-100">
                Product Publishing Center
              </CardTitle>
              <div className="text-sm text-emerald-800 dark:text-emerald-300">
                Select a product and optimize it for marketplace publication
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Product
                </label>
                <Input
                  value={selectedProduct}
                  placeholder="Select a product from the sidebar"
                  readOnly
                  className="bg-gray-50 dark:bg-gray-900 border-emerald-200 dark:border-emerald-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Details & Description
                </label>
                <Textarea
                  className="h-32 border-emerald-200 dark:border-emerald-700 resize-none"
                  placeholder="Enter product details, features, pricing, and target audience..."
                  value={productData}
                  onChange={(e) => setProductData(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={!selectedProduct || !productData.trim() || loading}
                  onClick={handlePublish}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Publish to Marketplace
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setProductData("");
                    setResult(null);
                  }}
                  disabled={loading}
                  className="border-emerald-200 dark:border-emerald-700"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="border-emerald-100 dark:border-emerald-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                  <Package className="h-5 w-5" />
                  Publishing Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800">
                  <p className="text-emerald-900 dark:text-emerald-100">{result}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-700">
                    <Globe className="mr-2 h-4 w-4" />
                    View Live Listing
                  </Button>
                  <Button variant="outline" size="sm" className="border-emerald-200 dark:border-emerald-700">
                    <Upload className="mr-2 h-4 w-4" />
                    Update Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIMarketplacePublisherInterface;
