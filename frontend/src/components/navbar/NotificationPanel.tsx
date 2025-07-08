
import React from 'react';
import { Button } from '@/components/ui/button';
import { BellRing } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: "New feature alert!",
    description: "You can now integrate with Slack.",
    time: "15m ago"
  },
  {
    id: 2,
    title: "Your subscription is renewing soon",
    description: "Your Pro plan will renew on July 14, 2025.",
    time: "1h ago"
  },
  {
    id: 3,
    title: "Welcome to Lovable!",
    description: "Thanks for signing up. We're glad to have you.",
    time: "1d ago"
  }
];

interface NotificationPanelProps {
  onClear: () => void;
  notificationCount: number;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClear, notificationCount }) => {
  const notificationsToDisplay = mockNotifications.slice(0, notificationCount);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Notifications</h3>
        {notificationCount > 0 && (
            <Button variant="link" size="sm" onClick={onClear} className="text-primary p-0 h-auto">
                Clear all
            </Button>
        )}
      </div>
      <div className="flex flex-col max-h-80 overflow-y-auto">
        {notificationsToDisplay.length > 0 ? (
          notificationsToDisplay.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4 p-4 border-b last:border-b-0 hover:bg-accent">
              <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                  <BellRing className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            <BellRing className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
