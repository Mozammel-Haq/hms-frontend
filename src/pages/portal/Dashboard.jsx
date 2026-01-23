import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Activity, Pill, Clock, Plus, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const { activeClinic } = useClinic();

  // Mock data - replace with API calls later
  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Ahmed', specialty: 'Cardiology', date: '2023-10-25', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Rahim Khan', specialty: 'General Medicine', date: '2023-11-02', time: '02:30 PM', status: 'Pending' },
  ];

  const recentVitals = {
    bp: '120/80',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    weight: '70 kg',
    lastUpdated: '2 days ago'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-secondary-900 rounded-lg p-6 border border-secondary-200 dark:border-secondary-800">
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          Welcome back, {user?.name || 'Patient'}!
        </h1>
        <p className="text-secondary-500 dark:text-secondary-400 mt-1">
          {activeClinic
            ? `You are viewing records for ${activeClinic.name}.`
            : 'Select a clinic to view your specific records.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-secondary-900 p-5 rounded-lg border border-secondary-200 dark:border-secondary-800 flex items-center space-x-4">
          <div className="bg-primary-50 dark:bg-primary-500/10 p-3 rounded-full text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-500/20">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Appointments</p>
            <p className="text-xl font-bold text-secondary-900 dark:text-white">{upcomingAppointments.length} Upcoming</p>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 p-5 rounded-lg border border-secondary-200 dark:border-secondary-800 flex items-center space-x-4">
          <div className="bg-green-50 dark:bg-green-500/10 p-3 rounded-full text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Last BP</p>
            <p className="text-xl font-bold text-secondary-900 dark:text-white">{recentVitals.bp}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 p-5 rounded-lg border border-secondary-200 dark:border-secondary-800 flex items-center space-x-4">
          <div className="bg-purple-50 dark:bg-purple-500/10 p-3 rounded-full text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Prescriptions</p>
            <p className="text-xl font-bold text-secondary-900 dark:text-white">2 Active</p>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 p-5 rounded-lg border border-secondary-200 dark:border-secondary-800 flex items-center space-x-4">
          <div className="bg-orange-50 dark:bg-orange-500/10 p-3 rounded-full text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Next Visit</p>
            <p className="text-xl font-bold text-secondary-900 dark:text-white">Oct 25</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 flex flex-col">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-800 flex justify-between items-center">
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Upcoming Appointments</h2>
            <Link to="/portal/appointments">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>
          <div className="p-6 flex-1">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg border border-secondary-200 dark:border-secondary-800 hover:border-primary-500/30 transition-colors">
                    <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                      <div className="bg-white dark:bg-secondary-800 p-2 rounded-lg border border-secondary-200 dark:border-secondary-700 text-primary-600 dark:text-primary-400 font-bold text-center min-w-[60px]">
                        <span className="block text-xs uppercase tracking-wider text-secondary-500 dark:text-secondary-400">{apt.date.split('-')[1]}</span>
                        <span className="block text-xl">{apt.date.split('-')[2]}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary-900 dark:text-white">{apt.doctor}</h3>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400">{apt.specialty}</p>
                        <div className="flex items-center text-xs text-secondary-500 dark:text-secondary-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {apt.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        apt.status === 'Confirmed'
                          ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20'
                          : 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20'
                      }`}>
                        {apt.status}
                      </span>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-secondary-500 dark:text-secondary-400">
                <Calendar className="w-12 h-12 mx-auto text-secondary-400 dark:text-secondary-600 mb-3" />
                <p>No upcoming appointments.</p>
                <Link to="/portal/appointments/book" className="mt-4 inline-block">
                  <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Book Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Vitals */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 p-6">
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/portal/appointments/book" className="block">
                <Button variant="primary" className="w-full justify-start" leftIcon={<Plus className="w-4 h-4" />}>
                  Book New Appointment
                </Button>
              </Link>
              <Link to="/portal/prescriptions" className="block">
                <Button variant="outline" className="w-full justify-start border-secondary-200 dark:border-secondary-700 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800" leftIcon={<Pill className="w-4 h-4" />}>
                  Refill Prescription
                </Button>
              </Link>
              <Link to="/portal/lab-results" className="block">
                <Button variant="outline" className="w-full justify-start border-secondary-200 dark:border-secondary-700 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800" leftIcon={<Activity className="w-4 h-4" />}>
                  View Latest Lab Results
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Vitals Summary */}
          <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 p-6">
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white mb-4">Recent Vitals</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-secondary-100 dark:border-secondary-800">
                <span className="text-secondary-500 dark:text-secondary-400 text-sm">Blood Pressure</span>
                <span className="font-bold text-secondary-900 dark:text-white">{recentVitals.bp}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-secondary-100 dark:border-secondary-800">
                <span className="text-secondary-500 dark:text-secondary-400 text-sm">Heart Rate</span>
                <span className="font-bold text-secondary-900 dark:text-white">{recentVitals.heartRate}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-secondary-100 dark:border-secondary-800">
                <span className="text-secondary-500 dark:text-secondary-400 text-sm">Weight</span>
                <span className="font-bold text-secondary-900 dark:text-white">{recentVitals.weight}</span>
              </div>
              <p className="text-xs text-secondary-400 dark:text-secondary-500 text-right mt-2">
                Last updated: {recentVitals.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
