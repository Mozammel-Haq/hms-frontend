import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, GraduationCap, Calendar, Clock, Phone, Mail, Award, BookOpen } from 'lucide-react';
import Button from '../../components/common/Button';

const DoctorDetails = () => {
  const { id } = useParams();

  // Mock Data (same as Doctors.jsx for consistency)
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
      availability: "Mon, Wed, Fri",
      biography: "Dr. Sarah Ahmed is a renowned cardiologist with over a decade of experience in diagnosing and treating complex heart conditions. She is dedicated to providing patient-centered care and staying updated with the latest advancements in cardiac medicine.",
      expertise: ["Interventional Cardiology", "Heart Failure Management", "Preventive Cardiology", "Echocardiography"],
      languages: ["English", "Urdu", "Spanish"]
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
      availability: "Tue, Thu, Sat",
      biography: "Dr. Rahim Khan focuses on comprehensive adult healthcare, managing both common and complex illnesses. He emphasizes preventive care and works closely with patients to achieve long-term health goals.",
      expertise: ["Chronic Disease Management", "Infectious Diseases", "Diabetes Management", "Hypertension"],
      languages: ["English", "Urdu"]
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
      availability: "Mon - Fri",
      biography: "Dr. Emily Chen is a board-certified dermatologist specializing in both medical and cosmetic dermatology. She is passionate about helping patients achieve healthy, radiant skin through personalized treatment plans.",
      expertise: ["Acne Treatment", "Laser Therapy", "Skin Cancer Screening", "Cosmetic Dermatology"],
      languages: ["English", "Mandarin"]
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
      availability: "Mon, Wed",
      biography: "Dr. Michael Ross is a highly skilled orthopedic surgeon with extensive experience in joint replacement and sports medicine. He is committed to restoring mobility and improving the quality of life for his patients.",
      expertise: ["Joint Replacement", "Sports Medicine", "Arthroscopy", "Trauma Surgery"],
      languages: ["English", "German"]
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
      availability: "Tue, Thu, Fri",
      biography: "Dr. Jessica Lee is a compassionate pediatrician dedicated to the health and well-being of children from infancy through adolescence. She believes in building strong relationships with families to provide the best possible care.",
      expertise: ["Newborn Care", "Adolescent Medicine", "Immunizations", "Developmental Assessment"],
      languages: ["English", "Korean"]
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
      availability: "Mon, Thu",
      biography: "Dr. David Kim is a leading neurologist specializing in the diagnosis and treatment of disorders affecting the brain, spinal cord, and nerves. He is known for his thorough approach and patient-centric care.",
      expertise: ["Stroke Management", "Epilepsy", "Multiple Sclerosis", "Headache Disorders"],
      languages: ["English", "French"]
    }
  ];

  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col items-center justify-center pt-20 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Doctor Not Found</h2>
        <Link to="/doctors">
          <Button>Back to Doctors Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-secondary-50 dark:bg-secondary-950 transition-colors duration-300">
      {/* Profile Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-secondary-800">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">{doctor.name}</h1>
                  <p className="text-xl text-primary-600 dark:text-primary-400 font-medium mt-1">{doctor.specialty}</p>
                </div>
                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-bold text-secondary-900 dark:text-white">{doctor.rating}</span>
                  <span className="ml-1 text-sm text-secondary-600 dark:text-secondary-400">({doctor.reviews} reviews)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <GraduationCap className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{doctor.education}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <Award className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{doctor.experience} Experience</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center text-secondary-600 dark:text-secondary-400">
                  <BookOpen className="w-5 h-5 mr-3 text-primary-500" />
                  <span>Languages: {doctor.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="bg-white dark:bg-secondary-900 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-800">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">About {doctor.name}</h2>
              <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                {doctor.biography}
              </p>
            </div>

            {/* Expertise */}
            <div className="bg-white dark:bg-secondary-900 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-800">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">Areas of Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doctor.expertise.map((item, index) => (
                  <div key={index} className="flex items-center text-secondary-700 dark:text-secondary-300">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Contact */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-secondary-900 rounded-xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-800 sticky top-24">
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-4">Book Appointment</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">Availability</p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">{doctor.availability}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary-600 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">Timings</p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <Link to="/portal/appointments/book" className="block">
                <Button className="w-full justify-center">Schedule Consultation</Button>
              </Link>
              
              <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-800">
                 <p className="text-sm text-center text-secondary-500 dark:text-secondary-400 mb-4">
                   Need help booking?
                 </p>
                 <div className="flex justify-center gap-4">
                   <button className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                     <Phone className="w-5 h-5" />
                   </button>
                   <button className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                     <Mail className="w-5 h-5" />
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
