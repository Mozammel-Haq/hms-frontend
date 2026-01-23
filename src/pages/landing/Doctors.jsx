import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Star, GraduationCap, Calendar } from 'lucide-react';
import Button from '../../components/common/Button';

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const initialSpecialty = searchParams.get('specialty') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);

  // Mock Data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      specialty: "Cardiology",
      education: "MBBS, FCPS (Cardiology)",
      experience: "12 Years",
      location: "Building A, Room 302",
      rating: 4.9,
      reviews: 124,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      availability: "Mon, Wed, Fri"
    },
    {
      id: 2,
      name: "Dr. Rahim Khan",
      specialty: "General Medicine",
      education: "MBBS, MD (Internal Medicine)",
      experience: "8 Years",
      location: "Building B, Room 105",
      rating: 4.7,
      reviews: 89,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      availability: "Tue, Thu, Sat"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "Dermatology",
      education: "MBBS, DDV (Dermatology)",
      experience: "15 Years",
      location: "Building A, Room 204",
      rating: 4.8,
      reviews: 210,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      availability: "Mon - Fri"
    },
    {
      id: 4,
      name: "Dr. Michael Ross",
      specialty: "Orthopedics",
      education: "MBBS, MS (Ortho)",
      experience: "20 Years",
      location: "Building C, Room 110",
      rating: 4.9,
      reviews: 340,
      image: "https://randomuser.me/api/portraits/men/85.jpg",
      availability: "Mon, Wed"
    },
    {
      id: 5,
      name: "Dr. Jessica Lee",
      specialty: "Pediatrics",
      education: "MBBS, DCH",
      experience: "10 Years",
      location: "Building B, Room 201",
      rating: 4.8,
      reviews: 156,
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      availability: "Tue, Thu, Fri"
    },
    {
      id: 6,
      name: "Dr. David Kim",
      specialty: "Neurology",
      education: "MBBS, MD (Neurology)",
      experience: "18 Years",
      location: "Building A, Room 405",
      rating: 5.0,
      reviews: 98,
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      availability: "Mon, Thu"
    }
  ];

  const specialties = ["All", ...new Set(doctors.map(d => d.specialty))];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  useEffect(() => {
    if (initialSpecialty && initialSpecialty !== selectedSpecialty) {
      setSelectedSpecialty(initialSpecialty);
    }
  }, [initialSpecialty, selectedSpecialty]);

  return (
    <div className="pt-20 min-h-screen bg-secondary-50 dark:bg-secondary-950 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-950 border-b border-secondary-200 dark:border-secondary-800 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-600/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center animate-fade-in-up relative z-10">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white sm:text-4xl">Find a Doctor</h1>
          <p className="mt-3 max-w-2xl mx-auto text-secondary-600 dark:text-secondary-400 text-lg">
            Search our directory of experienced medical professionals.
          </p>

          {/* Search & Filter */}
          <div className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-secondary-200 dark:border-secondary-700 rounded-lg leading-5 bg-white dark:bg-secondary-900 placeholder-secondary-500 text-secondary-900 dark:text-white focus:outline-none focus:placeholder-secondary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition-all"
                placeholder="Search by doctor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="block w-full sm:w-48 pl-3 pr-10 py-3 text-base border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-lg transition-all"
            >
              <option value="" className="bg-white dark:bg-secondary-900">All Specialties</option>
              {specialties.filter(s => s !== 'All').map(s => (
                <option key={s} value={s} className="bg-white dark:bg-secondary-900">{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc, index) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-700 overflow-hidden hover:border-primary-500/50 transition-all duration-300 flex flex-col group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-secondary-50 dark:border-secondary-800 group-hover:border-primary-100 dark:group-hover:border-primary-900/50 transition-colors"
                    />
                    <div className="flex flex-col items-end">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700/30">
                        {doc.specialty}
                      </span>
                      <div className="flex items-center mt-2 text-yellow-500 text-sm font-bold">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        {doc.rating} <span className="text-secondary-500 dark:text-secondary-400 font-normal ml-1">({doc.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <Link to={`/doctors/${doc.id}`}>
                      {doc.name}
                    </Link>
                  </h3>
                  <div className="space-y-2 mt-3">
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-secondary-400 dark:text-secondary-500" />
                      {doc.education}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-secondary-400 dark:text-secondary-500" />
                      {doc.location}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-secondary-400 dark:text-secondary-500" />
                      Avail: {doc.availability}
                    </p>
                  </div>
                </div>

                <div className="bg-secondary-50 dark:bg-secondary-800/50 p-4 border-t border-secondary-200 dark:border-secondary-800 flex gap-3">
                  <Link to="/portal/appointments/book" className="w-full">
                    <Button size="sm" className="w-full shadow-none">Book Appointment</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-secondary-500 dark:text-secondary-400 text-lg">No doctors found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedSpecialty(''); }}
              className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
