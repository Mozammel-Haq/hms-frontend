import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar as CalendarIcon, Clock, User, Info, CheckCircle } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';
import Button from '../../components/common/Button';
import { useUI } from '../../context/UIContext';
import { useClinic } from '../../context/ClinicContext';

// Schema
const bookingSchema = z.object({
  department: z.string().min(1, 'Please select a department'),
  doctor: z.string().min(1, 'Please select a doctor'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  reason: z.string().min(5, 'Please provide a brief reason for visit'),
});

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
  const navigate = useNavigate();
  const { addToast } = useUI();
  const { activeClinic } = useClinic();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: format(startOfToday(), 'yyyy-MM-dd'),
    }
  });

  const selectedDoctor = watch('doctor');
  const selectedTime = watch('time');

  // Mock Data
  const departments = ['Cardiology', 'General Medicine', 'Dermatology', 'Pediatrics', 'Orthopedics'];
  const doctors = [
    { id: '1', name: 'Dr. Sarah Ahmed', specialty: 'Cardiology', available: true },
    { id: '2', name: 'Dr. Rahim Khan', specialty: 'General Medicine', available: true },
    { id: '3', name: 'Dr. Emily Chen', specialty: 'Dermatology', available: true },
  ];
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const onSubmit = async (data) => {
    // INTEGRATION: Use the correct endpoint from endpoints.js
    // try {
    //   await api.post(API_ENDPOINTS.PATIENT.BOOK_APPOINTMENT, {
    //     ...data,
    //     clinic_id: activeClinic?.id
    //   });
    //   addToast('success', 'Appointment request submitted successfully!');
    //   navigate('/portal/appointments');
    // } catch (error) {
    //   addToast('error', 'Failed to book appointment');
    // }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Booking Data:', data);
    addToast('success', 'Appointment request submitted successfully!');
    navigate('/portal/appointments');
  };

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(startOfToday(), i);
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEE, MMM d'),
      day: format(date, 'd'),
      weekday: format(date, 'EEE')
    };
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Book New Appointment</h1>
        <p className="text-secondary-500 dark:text-secondary-400 mt-1">Schedule a visit with our specialists at {activeClinic?.name || 'CityCare'}.</p>
      </div>

      <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 overflow-hidden">
        {/* Progress Steps */}
        <div className="bg-secondary-50 dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 p-4">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-secondary-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 ${step >= 1 ? 'bg-primary-600 text-white border-primary-600' : 'bg-secondary-200 dark:bg-secondary-800 border-secondary-300 dark:border-secondary-800'}`}>1</div>
              <span>Specialty & Doctor</span>
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? 'bg-primary-500/50' : 'bg-secondary-200 dark:bg-secondary-700'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-secondary-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 ${step >= 2 ? 'bg-primary-600 text-white border-primary-600' : 'bg-secondary-200 dark:bg-secondary-800 border-secondary-300 dark:border-secondary-800'}`}>2</div>
              <span>Date & Time</span>
            </div>
            <div className={`h-1 w-12 ${step >= 3 ? 'bg-primary-500/50' : 'bg-secondary-200 dark:bg-secondary-700'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-secondary-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 ${step >= 3 ? 'bg-primary-600 text-white border-primary-600' : 'bg-secondary-200 dark:bg-secondary-800 border-secondary-300 dark:border-secondary-800'}`}>3</div>
              <span>Confirm</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Select Department</label>
                <select
                  {...register('department')}
                  className="block w-full rounded-md border-secondary-300 dark:border-secondary-800 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 py-2.5 px-3 border"
                >
                  <option value="" className="bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white">-- Choose Department --</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white">{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.department.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Select Doctor</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctors.map((doc) => (
                    <div
                      key={doc.id}
                      className={`relative rounded-lg border p-4 cursor-pointer hover:border-primary-500/50 transition-all ${
                        selectedDoctor === doc.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 ring-1 ring-primary-500/50' : 'border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-800'
                      }`}
                      onClick={() => setValue('doctor', doc.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-secondary-500 dark:text-secondary-400">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary-900 dark:text-white">{doc.name}</h3>
                          <p className="text-sm text-secondary-500 dark:text-secondary-400">{doc.specialty}</p>
                        </div>
                      </div>
                      {selectedDoctor === doc.id && (
                        <div className="absolute top-2 right-2 text-primary-600 dark:text-primary-500">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {errors.doctor && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.doctor.message}</p>}
                <input type="hidden" {...register('doctor')} />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    if (watch('department') && watch('doctor')) setStep(2);
                    else addToast('error', 'Please select department and doctor');
                  }}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">Select Date</label>
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
                  {dates.map((d) => (
                    <div
                      key={d.value}
                      onClick={() => {
                        setSelectedDate(d.value);
                        setValue('date', d.value);
                      }}
                      className={`flex-shrink-0 w-16 h-20 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${
                        selectedDate === d.value
                          ? 'bg-primary-600 text-white border-primary-600 transform scale-105'
                          : 'bg-white dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400 border-secondary-200 dark:border-secondary-800 hover:border-primary-500/50 hover:bg-secondary-50 dark:hover:bg-secondary-700'
                      }`}
                    >
                      <span className="text-xs font-medium">{d.weekday}</span>
                      <span className="text-xl font-bold">{d.day}</span>
                    </div>
                  ))}
                </div>
                <input type="hidden" {...register('date')} />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">Select Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setValue('time', slot)}
                      className={`py-2 px-2 text-sm rounded-md border transition-all ${
                        selectedTime === slot
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border-secondary-200 dark:border-secondary-800 hover:border-primary-500/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.time.message}</p>}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    if (watch('date') && watch('time')) setStep(3);
                    else addToast('error', 'Please select date and time');
                  }}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-500/20 rounded-lg p-6">
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-4">Confirm Appointment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Department:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">{watch('department')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Doctor:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">
                      {doctors.find(d => d.id === watch('doctor'))?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Date:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">{watch('date')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Time:</span>
                    <span className="font-medium text-secondary-900 dark:text-white">{watch('time')}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Reason for Visit</label>
                <textarea
                  {...register('reason')}
                  rows="3"
                  className="block w-full rounded-md border-secondary-300 dark:border-secondary-800 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 p-3 border"
                  placeholder="Please describe your symptoms or reason for appointment..."
                ></textarea>
                {errors.reason && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.reason.message}</p>}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" isLoading={isSubmitting}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
