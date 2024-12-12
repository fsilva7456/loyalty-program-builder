import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

const memberData = [
  { month: 'Jan', active: 300, new: 120 },
  { month: 'Feb', active: 400, new: 150 },
  { month: 'Mar', active: 500, new: 180 },
  { month: 'Apr', active: 450, new: 160 },
  { month: 'May', active: 600, new: 200 }
];

const rewardData = [
  { name: 'Free Product', value: 35 },
  { name: 'Discount', value: 45 },
  { name: 'Special Access', value: 20 }
];

const engagementData = [
  { day: 'Mon', engagement: 78 },
  { day: 'Tue', engagement: 82 },
  { day: 'Wed', engagement: 85 },
  { day: 'Thu', engagement: 80 },
  { day: 'Fri', engagement: 90 },
  { day: 'Sat', engagement: 95 },
  { day: 'Sun', engagement: 88 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const MetricCard = ({ title, value, change, changeType }) => (
  <Card className="p-6">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold">{value}</span>
      <div className={`flex items-center ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
        {changeType === 'increase' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        <span className="ml-1">{change}%</span>
      </div>
    </div>
  </Card>
);

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Members"
          value="1,234"
          change="12"
          changeType="increase"
        />
        <MetricCard
          title="Reward Redemption Rate"
          value="68%"
          change="5"
          changeType="increase"
        />
        <MetricCard
          title="Average Points Balance"
          value="2,450"
          change="8"
          changeType="increase"
        />
        <MetricCard
          title="Churn Rate"
          value="2.4%"
          change="0.5"
          changeType="decrease"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Member Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#0088FE" name="Active Members" />
                <Bar dataKey="new" fill="#00C49F" name="New Members" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Engagement Rate */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Engagement Rate</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Reward Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Reward Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rewardData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {rewardData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {rewardData.map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Key Insights */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-4">
            {[
              {
                title: 'Member Engagement',
                description: 'Engagement peaks on weekends with 95% participation rate'
              },
              {
                title: 'Popular Rewards',
                description: 'Discounts are the most redeemed reward type at 45%'
              },
              {
                title: 'Growth Trend',
                description: 'Consistent 15% month-over-month member growth'
              }
            ].map((insight, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;