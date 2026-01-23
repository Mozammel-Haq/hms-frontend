import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, GraduationCap, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const DoctorsCarousel = () => {
  const scrollContainerRef = useRef(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      specialty: "Cardiology",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      qualification: "MBBS, FCPS"
    },
    {
      id: 2,
      name: "Dr. Rahim Khan",
      specialty: "Neurology",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
      qualification: "MD, Neuro"
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      specialty: "Pediatrics",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      qualification: "MBBS, DCH"
    },
    {
      id: 4,
      name: "Dr. Michael Ross",
      specialty: "Orthopedics",
      image: "https://randomuser.me/api/portraits/men/80.jpg",
      qualification: "MS Ortho"
    },
    {
      id: 5,
      name: "Dr. Jessica Lee",
      specialty: "Dermatology",
      image: "https://randomuser.me/api/portraits/women/20.jpg",
      qualification: "DDV"
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-secondary-50 dark:bg-secondary-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Meet Our Specialists
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400">
              Our team of expert doctors is dedicated to providing you with the best possible care.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full w-12 h-12 p-0 border-secondary-200 dark:border-secondary-700"
              onClick={scrollLeft}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full w-12 h-12 p-0 border-secondary-200 dark:border-secondary-700"
              onClick={scrollRight}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <Link to="/doctors">
              <Button
                variant="primary"
                className="rounded-full w-12 h-12 p-0 hover:outline hover:outline-2 hover:outline-primary-500 dark:hover:outline-primary-400"
                aria-label="View all doctors"
              >
                <Plus className="w-6 h-6 hover:text-primary-500 dark:hover:text-primary-400" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="min-w-[300px] md:min-w-[350px] bg-white dark:bg-secondary-900 backdrop-blur-sm rounded-xl border border-secondary-200 dark:border-secondary-700 overflow-hidden group hover:border-primary-500/50 transition-all duration-300 snap-center"
            >
              <div className="relative h-64 overflow-hidden bg-secondary-100 dark:bg-secondary-700">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-medium">Book an appointment</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider bg-primary-50 dark:bg-primary-600/10 px-2 py-1 rounded-sm border border-primary-100 dark:border-primary-600/20">
                      {doctor.specialty}
                    </span>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mt-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      <Link to={`/doctors/${doctor.id}`}>
                        {doctor.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-secondary-700 dark:text-secondary-300">4.9</span>
                  </div>
                </div>

                <p className="text-sm text-secondary-600 dark:text-secondary-400 flex items-center gap-2 mb-6">
                  <GraduationCap className="w-4 h-4 text-secondary-400 dark:text-secondary-500" />
                  {doctor.qualification}
                </p>

                <Link to={`/doctors/${doctor.id}`} className="block">
                  <Button variant="outline" className="w-full border-secondary-200 dark:border-secondary-800 text-secondary-600 dark:text-secondary-300 hover:border-primary-600 hover:text-white hover:bg-primary-600 dark:hover:bg-secondary-800">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsCarousel;
