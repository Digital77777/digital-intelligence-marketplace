
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Clock, ChevronRight } from "lucide-react";

export interface ForumTopic {
  id: string;
  title: string;
  username?: string;
  replies?: number;
  created_at: string;
}

interface SimpleForumCardProps {
  categoryName: string;
  topics: ForumTopic[];
  onNewTopic: () => void;
  formatDate: (date: string) => string;
}

const SimpleForumCard: React.FC<SimpleForumCardProps> = ({
  categoryName,
  topics,
  onNewTopic,
  formatDate,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 pt-6 pb-2">
        <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">{categoryName}</h2>
        <Button
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={onNewTopic}
        >
          + New Thread
        </Button>
      </div>
      <div className="divide-y divide-gray-100">
        {topics.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <MessageSquare className="inline mr-2 text-blue-300" />
            No topics yet. Start the first!
          </div>
        ) : (
          topics.map((topic) => (
            <div 
              key={topic.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-blue-50 cursor-pointer transition"
              onClick={() => navigate(`/community/topic/${topic.id}`)}
            >
              <div>
                <div className="text-base font-medium text-gray-900">{topic.title}</div>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {topic.username || "Anonymous"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> {topic.replies ?? 0} replies
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {formatDate(topic.created_at)}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SimpleForumCard;
