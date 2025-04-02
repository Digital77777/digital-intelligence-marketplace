
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Lock, Video, MessageCircle } from 'lucide-react';
import { useTier } from '@/context/TierContext';
import { LiveEvent } from '@/types/learning';

interface LiveEventsProps {
  events: LiveEvent[];
  registeredEvents?: string[];
  isLoading?: boolean;
}

const LiveEvents: React.FC<LiveEventsProps> = ({ 
  events, 
  registeredEvents = [],
  isLoading = false 
}) => {
  const { currentTier, upgradePrompt } = useTier();
  
  const isEventLocked = (event: LiveEvent) => {
    if (event.required_tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (event.required_tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };
  
  const isRegistered = (eventId: string) => {
    return registeredEvents.includes(eventId);
  };
  
  const getEventTypeIcon = (type: LiveEvent['event_type']) => {
    switch (type) {
      case 'webinar':
        return <Video className="h-5 w-5" />;
      case 'workshop':
        return <Users className="h-5 w-5" />;
      case 'masterclass':
        return <Video className="h-5 w-5" />;
      case 'ama':
        return <MessageCircle className="h-5 w-5" />;
      case 'summit':
        return <Users className="h-5 w-5" />;
      default:
        return <Video className="h-5 w-5" />;
    }
  };
  
  const getEventTypeBadge = (type: LiveEvent['event_type']) => {
    switch (type) {
      case 'webinar':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 capitalize">{type}</Badge>;
      case 'workshop':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 capitalize">{type}</Badge>;
      case 'masterclass':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 capitalize">{type}</Badge>;
      case 'ama':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">Ask Me Anything</Badge>;
      case 'summit':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 capitalize">{type}</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{type}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Check back later for new events or subscribe to our newsletter to stay updated.
        </p>
      </div>
    );
  }
  
  // Sort events by date (closest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );
  
  return (
    <div className="space-y-4">
      {sortedEvents.map(event => {
        const eventDate = new Date(event.datetime);
        const isPast = eventDate < new Date();
        const registrationClosed = event.registration_deadline ? 
          new Date(event.registration_deadline) < new Date() : false;
        
        return (
          <Card key={event.id} className={`overflow-hidden ${isPast ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Hosted by {event.host_name}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getEventTypeBadge(event.event_type)}
                  {isPast && <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">Ended</Badge>}
                  {!isPast && isRegistered(event.id) && <Badge className="bg-green-500 text-white hover:bg-green-600">Registered</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-4">
                {event.description}
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground gap-y-2 md:gap-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{format(eventDate, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{format(eventDate, 'h:mm a')} • {event.duration} minutes</span>
                </div>
                {event.max_participants && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Limited to {event.max_participants} participants</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              {isEventLocked(event) ? (
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto" 
                  onClick={() => upgradePrompt(event.required_tier as any)}
                >
                  <Lock className="mr-2 h-4 w-4" /> Upgrade to Access
                </Button>
              ) : isPast ? (
                <Button variant="outline" className="w-full md:w-auto" disabled>
                  Event Ended
                </Button>
              ) : isRegistered(event.id) ? (
                <Button className="w-full md:w-auto">
                  Join Event
                </Button>
              ) : registrationClosed ? (
                <Button variant="outline" className="w-full md:w-auto" disabled>
                  Registration Closed
                </Button>
              ) : (
                <Button className="w-full md:w-auto">
                  Register Now
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default LiveEvents;
