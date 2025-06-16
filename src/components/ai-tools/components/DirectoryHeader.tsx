import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface DirectoryHeaderProps {
  totalTools: number;
}
const DirectoryHeader: React.FC<DirectoryHeaderProps> = ({
  totalTools
}) => {
  const navigate = useNavigate();
  return <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-3">
      <div>
        <Button variant="ghost" onClick={() => navigate('/ai-tools')} className="mb-2 -ml-3 bg-blue-700 hover:bg-blue-600 text-slate-50">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Tools Home
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Tools Directory</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {totalTools} Total Tools
          </Badge>
          <p className="text-gray-600">
            Browse, filter, and compare AI tools by category and tier
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate('/pricing')} className="text-sm bg-blue-600 hover:bg-blue-500 text-slate-50">
          <Info className="h-4 w-4 mr-1.5" />
          Compare Plans
        </Button>
      </div>
    </div>;
};
export default DirectoryHeader;