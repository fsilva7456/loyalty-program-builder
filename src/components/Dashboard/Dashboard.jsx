import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, Gift, TrendingUp, Award } from 'lucide-react';

const data = [
  { name: 'Jan', members: 400 },
  { name: 'Feb', members: 600 },
  { name: 'Mar', members: 800 },
  { name: 'Apr', members: 1000 },
  { name: 'May', members: 1200 }
];

const StatCard = ({ icon, label, value, trend }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {trend && (
        <span className="text-green-500 text-sm flex items-center">
          <TrendingUp size={16} className="mr-1" /> {trend}
        </span>
      )}
    </div>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="text-blue-500" />}
          label="Total Members"
          value="1,234"
          trend="+12%"
        />
        <StatCard
          icon={<Gift className="text-purple-500" />}
          label="Rewards Claimed"
          value="856"
          trend="+8%"
        />
        <StatCard
          icon={<Award className="text-green-500" />}
          label="Points Issued"
          value="45.2K"
          trend="+15%"
        />
        <StatCard
          icon={<TrendingUp className="text-orange-500" />}
          label="Program Health"
          value="92%"
          trend="+3%"
        />
      </div>

      {/* Activity Graph */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Member Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New Member Joined', time: '2 minutes ago', points: '+100' },
            { action: 'Reward Claimed', time: '5 minutes ago', points: '-500' },
            { action: 'Purchase Made', time: '10 minutes ago', points: '+250' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <span className={activity.points.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {activity.points} points
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;