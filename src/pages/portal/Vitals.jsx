import React from 'react';
import { Activity, Heart, Thermometer, Droplet, Weight, Wind, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';

const Vitals = () => {
  const vitals = [
    { title: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: Heart, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10', trend: 'up', change: '2%' },
    { title: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal', icon: Activity, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-500/10', trend: 'stable', change: '0%' },
    { title: 'Body Temperature', value: '98.6', unit: '°F', status: 'Normal', icon: Thermometer, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', trend: 'stable', change: '0%' },
    { title: 'Blood Oxygen', value: '98', unit: '%', status: 'Normal', icon: Wind, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', trend: 'up', change: '1%' },
    { title: 'Weight', value: '70', unit: 'kg', status: 'Overweight', icon: Weight, color: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-500/10', trend: 'down', change: '1.5%' },
    { title: 'Blood Glucose', value: '95', unit: 'mg/dL', status: 'Normal', icon: Droplet, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', trend: 'stable', change: '0%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Health Vitals</h1>
          <p className="text-secondary-500 dark:text-secondary-400">Monitor your key health metrics over time</p>
        </div>
        <Button>
          Log New Vitals
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vitals.map((vital, index) => (
          <div key={index} className="bg-white dark:bg-secondary-900 rounded-2xl p-6 border border-secondary-200 dark:border-secondary-800 hover:border-primary-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${vital.bg} ${vital.color} ${!vital.bg.includes('border') ? 'border border-transparent' : ''}`}>
                <vital.icon className="w-6 h-6" />
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                vital.status === 'Normal'
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/20 dark:text-primary-400 border border-primary-200 dark:border-primary-500/20'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
              }`}>
                {vital.status}
              </span>
            </div>

            <h3 className="text-secondary-500 dark:text-secondary-400 font-medium text-sm mb-1">{vital.title}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-secondary-900 dark:text-white">{vital.value}</span>
              <span className="text-secondary-500 dark:text-secondary-400 text-sm">{vital.unit}</span>
            </div>

            <div className="flex items-center text-sm">
              {vital.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
              {vital.trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-500 mr-1" />}
              {vital.trend === 'stable' && <Activity className="w-4 h-4 text-secondary-400 mr-1" />}

              <span className={`font-medium ${
                vital.trend === 'up' ? 'text-green-500' :
                vital.trend === 'down' ? 'text-rose-500' : 'text-secondary-400'
              }`}>
                {vital.change}
              </span>
              <span className="text-secondary-400 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent History */}
      <div className="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-200 dark:border-secondary-800 overflow-hidden">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Recent History</h2>
          <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary-50 dark:bg-secondary-900/50 text-secondary-500 dark:text-secondary-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Heart Rate</th>
                <th className="px-6 py-4 font-semibold">Blood Pressure</th>
                <th className="px-6 py-4 font-semibold">Temperature</th>
                <th className="px-6 py-4 font-semibold">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-800">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">Mar {10 - i}, 2024</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-300">7{2+i} bpm</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-300">120/80</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-300">98.6°F</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-300">70 kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
