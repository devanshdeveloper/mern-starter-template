import React from 'react';
import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { Lock } from 'lucide-react';

const SecuritySettings = () => {
  return (
    <Card>
      <CardBody className="p-6">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              startContent={<Lock className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              startContent={<Lock className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              startContent={<Lock className="w-4 h-4 text-gray-400" />}
            />
          </div>

          <div className="pt-4">
            <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-500 mb-4">
              Add an extra layer of security to your account by enabling
              two-factor authentication.
            </p>
            <Button color="primary" variant="flat">
              Enable 2FA
            </Button>
          </div>

          <div className="flex justify-end pt-4">
            <Button color="primary">Update Password</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SecuritySettings;
