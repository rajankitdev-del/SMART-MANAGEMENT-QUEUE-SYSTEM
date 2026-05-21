import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Icon, Button } from '../components/UIComponents';
import { tokenApi } from '../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const tokenId = localStorage.getItem('activeTokenId');
      if (!tokenId) {
        setLoading(false);
        return;
      }
      try {
        const response = await tokenApi.getNotifications(tokenId);
        setNotifications(response.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-black text-primary tracking-tight">Notifications</h2>
        <p className="text-on-surface-variant font-bold">Stay updated with live alerts</p>
      </header>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 font-bold opacity-50">Checking for alerts...</div>
        ) : notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 border-l-4 relative overflow-hidden border-l-primary ${
                notif.type === 'warning' ? 'border-l-error' : 
                notif.type === 'alert' ? 'border-l-secondary' : 
                notif.type === 'success' ? 'border-l-tertiary' : ''
              }`}>
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${
                    notif.type === 'alert' ? 'bg-orange-100 text-orange-600' :
                    notif.type === 'warning' ? 'bg-red-100 text-red-600' :
                    notif.type === 'success' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon name={
                      notif.type === 'alert' ? 'notifications_active' :
                      notif.type === 'warning' ? 'report' :
                      notif.type === 'success' ? 'check_circle' :
                      'info'
                    } />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-black text-on-surface leading-tight">{notif.title}</h4>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60">{notif.time}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 opacity-40">
            <Icon name="notifications_off" className="!text-6xl" />
            <p className="font-bold">No new notifications</p>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button variant="outline" className="w-full h-14 border-dashed" disabled>
          {notifications.length > 0 ? 'No more notifications' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
