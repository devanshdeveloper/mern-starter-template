import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { User, Mail, Building } from 'lucide-react';

const AccountSettings = () => {
  return (
    <Card>
      <CardBody className="p-6">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <Button color="primary" variant="flat" size="sm">
                Change Avatar
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              startContent={<User className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Email"
              placeholder="john@example.com"
              startContent={<Mail className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Company"
              placeholder="Acme Inc"
              startContent={<Building className="w-4 h-4 text-gray-400" />}
            />
          </div>

          <div className="flex justify-end">
            <Button color="primary">Save Changes</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AccountSettings;
