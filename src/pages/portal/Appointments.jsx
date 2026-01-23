import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, Filter, Plus, FileText, User } from 'lucide-react';
import Button from '../../components/common/Button';

const Appointments = () => {
  const [filter, setFilter] = useState('upcoming');

  // Mock data
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Ahmed',
      specialty: 'Cardiology',
      date: '2023-10-25',
      time: '10:00 AM',
      status: 'Confirmed',
      location: 'Room 302, Building A',
      type: 'Follow-up'
    },
    {
      id: 2,
      doctor: 'Dr. Rahim Khan',
      specialty: 'General Medicine',
      date: '2023-11-02',
      time: '02:30 PM',
      status: 'Pending',
      location: 'Room 105, Building B',
      type: 'Consultation'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Chen',
      specialty: 'Dermatology',
      date: '2023-09-15',
      time: '11:15 AM',
      status: 'Completed',
      location: 'Room 204, Building A',
      type: 'Check-up'
    },
  ];

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'upcoming') return apt.status === 'Confirmed' || apt.status === 'Pending';
    if (filter === 'past') return apt.status === 'Completed' || apt.status === 'Cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">My Appointments</h1>
          <p className="text-secondary-500 dark:text-secondary-400 text-sm mt-1">Manage your upcoming visits and view history.</p>
        </div>
        <Link to="/portal/appointments/book">
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Book Appointment
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-secondary-900 p-4 rounded-lg border border-secondary-200 dark:border-secondary-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex bg-secondary-100 dark:bg-secondary-800 rounded-lg p-1 border border-secondary-200 dark:border-secondary-800">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              filter === 'upcoming'
                ? 'bg-white dark:bg-primary-600 text-primary-600 dark:text-white'
                : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-200 dark:hover:bg-secondary-700'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              filter === 'past'
                ? 'bg-white dark:bg-primary-600 text-primary-600 dark:text-white'
                : 'text-secondary-500 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-200 dark:hover:bg-secondary-700'
            }`}
          >
            Past History
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-secondary-400 dark:text-secondary-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-secondary-200 dark:border-secondary-800 rounded-md leading-5 bg-secondary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:placeholder-secondary-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors"
            placeholder="Search doctor or specialty..."
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt) => (
            <div key={apt.id} className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 overflow-hidden hover:border-primary-500/30 transition-colors">
              <div className="p-6 flex flex-col lg:flex-row gap-6">
                {/* Date Badge */}
                <div className="flex-shrink-0 flex flex-row lg:flex-col items-center lg:items-center justify-start gap-4 lg:gap-1">
                  <div className="bg-secondary-50 dark:bg-secondary-800 p-3 rounded-xl border border-secondary-200 dark:border-secondary-800 text-center min-w-[80px]">
                    <span className="block text-xs font-bold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">{apt.date.split('-')[1]}</span>
                    <span className="block text-2xl font-bold text-secondary-900 dark:text-white">{apt.date.split('-')[2]}</span>
                    <span className="block text-xs text-secondary-500">{apt.date.split('-')[0]}</span>
                  </div>
                  <div className="lg:hidden flex-1">
                     <h3 className="text-lg font-bold text-secondary-900 dark:text-white">{apt.doctor}</h3>
                     <p className="text-sm text-secondary-500 dark:text-secondary-400">{apt.specialty}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="hidden lg:block">
                    <h3 className="text-lg font-bold text-secondary-900 dark:text-white flex items-center">
                      {apt.doctor}
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 text-xs font-normal border border-secondary-200 dark:border-secondary-800">
                        {apt.type}
                      </span>
                    </h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">{apt.specialty}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1.5 text-secondary-400 dark:text-secondary-500" />
                      {apt.location}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                      <Clock className="w-4 h-4 mr-2 text-secondary-400 dark:text-secondary-500" />
                      <span className="font-medium text-secondary-700 dark:text-secondary-300">Time:</span>
                      <span className="ml-2">{apt.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                      <User className="w-4 h-4 mr-2 text-secondary-400 dark:text-secondary-500" />
                      <span className="font-medium text-secondary-700 dark:text-secondary-300">Doctor ID:</span>
                      <span className="ml-2">#{1000 + apt.id}</span>
                    </div>
                    <div className="flex items-center mt-2">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        apt.status === 'Confirmed' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20' :
                        apt.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20' :
                        apt.status === 'Completed' ? 'bg-secondary-100 dark:bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 border-secondary-200 dark:border-secondary-500/20' :
                        'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col justify-end lg:justify-center gap-2 border-t lg:border-t-0 lg:border-l border-secondary-200 dark:border-secondary-800 pt-4 lg:pt-0 lg:pl-6">
                  {apt.status === 'Confirmed' || apt.status === 'Pending' ? (
                    <>
                      <Button variant="outline" size="sm" className="w-full border-secondary-200 dark:border-secondary-800 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800">Reschedule</Button>
                      <Button variant="danger" size="sm" className="w-full bg-transparent text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-500/10 shadow-none">Cancel</Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full border-secondary-200 dark:border-secondary-800 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800">View Summary</Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 border-dashed">
            <Calendar className="w-12 h-12 mx-auto text-secondary-400 dark:text-secondary-600 mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white">No appointments found</h3>
            <p className="text-secondary-500 dark:text-secondary-400 mt-1">Try adjusting your filters or book a new appointment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
