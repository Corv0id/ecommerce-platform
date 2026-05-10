import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'ORDER' | 'SYSTEM';
  is_read: boolean;
  created_at: string;
  action_url?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated } = useAuthStore();

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const response = await api.get('/notifications/');
      const data = response.data.results || response.data;
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/notifications/${id}/`, { is_read: true });
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post('/notifications/mark_all_read/');
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    
    // In a real enterprise app, we would use WebSockets (Django Channels) here
    // For now, we poll every 30 seconds to simulate real-time
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications
  };
};
