import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import {
  Star,
  Search,
  Filter,
  BookOpen,
  Eye,
  Brain,
  BarChart,
  Workflow,
  Code,
  Database,
  Headphones,
  Users
} from 'lucide-react';

interface MarketplaceSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  ratingFilter: number;
  setRatingFilter: (rating: number) => void;
  categoriesFilter: string[];
  setCategoriesFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

const MarketplaceSearchFilters: React.FC<MarketplaceSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  ratingFilter,
  setRatingFilter,
  categoriesFilter,
  setCategoriesFilter
}) => {
  const categories = [
    { id: 'nlp', name: 'Natural Language Processing', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'computer-vision', name: 'Computer Vision', icon: <Eye className="w-5 h-5" /> },
    { id: 'ml-frameworks', name: 'ML Frameworks', icon: <Brain className="w-5 h-5" /> },
    { id: 'data-analysis', name: 'Data Analysis', icon: <BarChart className="w-5 h-5" /> },
    { id: 'automation', name: 'Automation', icon: <Workflow className="w-5 h-5" /> },
    { id: 'open-source-ai', name: 'Open-Source AI', icon: <Code className="w-5 h-5" /> },
    { id: 'code-assistance', name: 'Code Assistance', icon: <Code className="w-5 h-5" /> },
    { id: 'business-intelligence', name: 'Business Intelligence', icon: <Database className="w-5 h-5" /> },
    { id: 'audio-speech', name: 'Audio & Speech', icon: <Headphones className="w-5 h-5" /> },
    { id: 'collaboration', name: 'Collaboration', icon: <Users className="w-5 h-5" /> },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setCategoriesFilter(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="bg-card shadow-lg border rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search projects, experts, tools, or services..."
            className="pl-12 w-full h-12 text-lg border-2 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="flex items-center gap-2 h-12 px-6">
                <Filter size={18} /> 
                Advanced Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[500px]">
              <SheetHeader>
                <SheetTitle className="text-xl">Filter Results</SheetTitle>
                <SheetDescription>
                  Refine your search with advanced filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Minimum Rating</h3>
                  <RadioGroup 
                    value={String(ratingFilter)} 
                    onValueChange={(val) => setRatingFilter(Number(val))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="r0" />
                      <Label htmlFor="r0">Any rating</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="r4" />
                      <Label htmlFor="r4" className="flex items-center">
                        <span>4+</span>
                        <div className="flex ml-2">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4.5" id="r45" />
                      <Label htmlFor="r45" className="flex items-center">
                        <span>4.5+</span>
                        <div className="flex ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Categories</h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`cat-${category.id}`}
                          checked={categoriesFilter.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label htmlFor={`cat-${category.id}`} className="flex items-center gap-2">
                          {category.icon}
                          <span>{category.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    onClick={() => {
                      setRatingFilter(0);
                      setCategoriesFilter([]);
                    }}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSearchFilters;
