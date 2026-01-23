import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import Button from '../../components/common/Button';

const locations = [
  {
    id: 1,
    name: "Dhanmondi CityCare",
    type: "Main Campus",
    address: "123 Satmasjid Road, Dhanmondi, Dhaka 1209",
    phone: "+880 1234 567 890",
    hours: "Open 24/7",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80&w=800",
    mapLink: "https://maps.google.com"
  },
  {
    id: 2,
    name: "Gulshan Specialist Clinic",
    type: "Outpatient Center",
    address: "45 Gulshan Avenue, Dhaka 1212",
    phone: "+880 1987 654 321",
    hours: "8:00 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    mapLink: "https://maps.google.com"
  },
  {
    id: 3,
    name: "Uttara Diagnostic Center",
    type: "Lab & Imaging",
    address: "Sector 7, Uttara, Dhaka 1230",
    phone: "+880 1555 555 555",
    hours: "7:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1516549655169-df83a09217c6?auto=format&fit=crop&q=80&w=800",
    mapLink: "https://maps.google.com"
  }
];

const Locations = () => {
  return (
    <div className="pt-24 pb-20 bg-secondary-50 dark:bg-secondary-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-sm">Our Network</span>
          <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mt-2 mb-4">Find a Location Near You</h1>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            With multiple centers across the city, world-class healthcare is always within reach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="group border border-secondary-200 dark:border-secondary-800 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 bg-white dark:bg-secondary-900"
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-secondary-900/10 dark:bg-secondary-950/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-secondary-950/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 dark:text-primary-400 border border-primary-500/30">
                  {loc.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  <Link to={`/locations/${loc.id}`}>
                    {loc.name}
                  </Link>
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-secondary-600 dark:text-secondary-400">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-secondary-600 dark:text-secondary-400">
                    <Phone className="w-5 h-5 text-primary-600 dark:text-primary-500 shrink-0" />
                    <span className="text-sm font-medium">{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-secondary-600 dark:text-secondary-400">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-500 shrink-0" />
                    <span className="text-sm">{loc.hours}</span>
                  </div>
                </div>

                <a href={loc.mapLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full border-secondary-200 dark:border-secondary-800 text-secondary-600 dark:text-secondary-300 hover:border-primary-500 hover:text-white hover:bg-primary-600 dark:hover:bg-secondary-800">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 rounded-2xl overflow-hidden border border-secondary-200 dark:border-secondary-800 h-96 relative bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center animate-fade-in">
             <div className="text-center">
                 <MapPin className="w-12 h-12 text-secondary-400 dark:text-secondary-700 mx-auto mb-2" />
                 <p className="text-secondary-500 font-medium">Interactive Map Integration</p>
                 <p className="text-secondary-500 dark:text-secondary-600 text-sm">(Google Maps API would go here)</p>
             </div>
             {/* Simulating map UI */}
             <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-secondary-900/80 backdrop-blur p-2 rounded shadow-none border border-secondary-200 dark:border-secondary-800 text-xs text-secondary-500 dark:text-secondary-400">
                 Map data ©2025 Google
             </div>
        </div>

      </div>
    </div>
  );
};

export default Locations;
