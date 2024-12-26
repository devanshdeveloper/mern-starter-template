import { Card, CardBody, Switch } from '@nextui-org/react';
import { Bell, Mail, ShoppingBag, Users } from 'lucide-react';

const NotificationSettings = () => {
  const notifications = [
    {
      title: 'New Orders',
      description: 'Get notified when a new order is placed',
      icon: ShoppingBag,
      defaultChecked: true,
    },
    {
      title: 'Order Updates',
      description: 'Get notified about order status changes',
      icon: Bell,
      defaultChecked: true,
    },
    {
      title: 'Customer Messages',
      description: 'Get notified when customers send messages',
      icon: Mail,
      defaultChecked: false,
    },
    {
      title: 'New Customers',
      description: 'Get notified when new customers register',
      icon: Users,
      defaultChecked: false,
    },
  ];

  return (
    <Card>
      <CardBody className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className="flex items-start justify-between"
            >
              <div className="flex space-x-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <notification.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                </div>
              </div>
              <Switch defaultSelected={notification.defaultChecked} />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default NotificationSettings;
