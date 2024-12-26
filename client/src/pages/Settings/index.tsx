import { Helmet } from 'react-helmet-async';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings | E-Commerce Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          <AccountSettings />
          <NotificationSettings />
          <SecuritySettings />
        </div>
      </div>
    </>
  );
};

export default Settings;
