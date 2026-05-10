"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { Bell, Check, CheckCircle2, AlertCircle, Info, Package, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function CustomerNotificationsPage() {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'ERROR': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'ORDER': return <Package className="w-5 h-5 text-brand-500" />;
      case 'SYSTEM': return <Bell className="w-5 h-5 text-purple-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgForType = (type: string, isRead: boolean) => {
    if (isRead) return "bg-white";
    switch (type) {
      case 'SUCCESS': return "bg-emerald-50";
      case 'WARNING': return "bg-amber-50";
      case 'ERROR': return "bg-red-50";
      case 'ORDER': return "bg-brand-50";
      case 'SYSTEM': return "bg-purple-50";
      default: return "bg-blue-50";
    }
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-brand-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-neutral-500 mt-2">Stay updated on your orders and account activity.</p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-800 bg-brand-50 px-4 py-2 rounded-xl transition-colors"
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
            <p className="text-neutral-500 font-medium">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-neutral-50 text-neutral-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">You're all caught up!</h3>
            <p className="text-neutral-500">You don't have any notifications at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 transition-colors flex gap-4 ${getBgForType(notification.notification_type, notification.is_read)} ${!notification.is_read ? 'hover:brightness-95' : 'hover:bg-neutral-50'}`}
              >
                <div className="shrink-0 mt-1">
                  {getIconForType(notification.notification_type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className={`text-base font-bold ${notification.is_read ? 'text-neutral-700' : 'text-neutral-900'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs font-medium text-neutral-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm ${notification.is_read ? 'text-neutral-500' : 'text-neutral-700'}`}>
                    {notification.message}
                  </p>
                  
                  {notification.action_url && (
                    <a 
                      href={notification.action_url}
                      className="inline-block mt-4 text-sm font-bold text-brand-600 hover:text-brand-800"
                    >
                      View Details &rarr;
                    </a>
                  )}
                </div>
                
                {!notification.is_read && (
                  <div className="shrink-0 flex items-center">
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-brand-600 hover:bg-brand-100 transition-colors"
                      title="Mark as read"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
