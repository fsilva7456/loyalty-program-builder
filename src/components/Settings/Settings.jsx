import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Bell, Users, Link, Mail, Shield } from 'lucide-react';

const SettingsSection = ({ icon, title, description, children }) => (
  <Card className="p-6">
    <div className="flex items-start space-x-4 mb-6">
      <div className="p-2 bg-blue-50 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
    {children}
  </Card>
);

const ColorPicker = ({ label, value, onChange }) => (
  <div className="flex items-center space-x-4">
    <label className="text-sm font-medium w-32">{label}</label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-10 h-10 rounded cursor-pointer"
    />
  </div>
);

const Settings = () => {
  const [brandingSettings, setBrandingSettings] = useState({
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    accentColor: '#059669'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailDigest: true,
    newMembers: true,
    rewardsClaimed: true,
    programUpdates: false
  });

  const handleColorChange = (key, value) => {
    setBrandingSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-gray-500">Manage your program settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Branding */}
        <SettingsSection
          icon={<Palette className="text-blue-500" />}
          title="Branding"
          description="Customize your program's look and feel"
        >
          <div className="space-y-4">
            <ColorPicker
              label="Primary Color"
              value={brandingSettings.primaryColor}
              onChange={(value) => handleColorChange('primaryColor', value)}
            />
            <ColorPicker
              label="Secondary Color"
              value={brandingSettings.secondaryColor}
              onChange={(value) => handleColorChange('secondaryColor', value)}
            />
            <ColorPicker
              label="Accent Color"
              value={brandingSettings.accentColor}
              onChange={(value) => handleColorChange('accentColor', value)}
            />
            <div className="pt-4">
              <Button>Save Branding</Button>
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          icon={<Bell className="text-blue-500" />}
          title="Notifications"
          description="Configure your notification preferences"
        >
          <div className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
                <div
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => handleNotificationToggle(key)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-6' : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Team Access */}
        <SettingsSection
          icon={<Users className="text-blue-500" />}
          title="Team Access"
          description="Manage team member permissions"
        >
          <div className="space-y-4">
            {[
              { name: 'John Doe', role: 'Admin', email: 'john@example.com' },
              { name: 'Jane Smith', role: 'Editor', email: 'jane@example.com' }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{member.role}</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            <Button className="w-full">Add Team Member</Button>
          </div>
        </SettingsSection>

        {/* Integrations */}
        <SettingsSection
          icon={<Link className="text-blue-500" />}
          title="Integrations"
          description="Connect with other services"
        >
          <div className="space-y-4">
            {[
              { name: 'Email Marketing', status: 'Connected', icon: <Mail size={20} /> },
              { name: 'Analytics', status: 'Not Connected', icon: <Shield size={20} /> }
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded">
                    {integration.icon}
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-sm text-gray-500">{integration.status}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings;