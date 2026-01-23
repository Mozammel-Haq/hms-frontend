import React from 'react';
import { FileText, Download, Share2, Search, Filter, Beaker } from 'lucide-react';
import Button from '../../components/common/Button';

const LabResults = () => {
  const results = [
    { id: 1, test: 'Complete Blood Count (CBC)', date: '2024-03-10', doctor: 'Dr. Sarah Chen', status: 'Normal', file: 'cbc_report.pdf' },
    { id: 2, test: 'Lipid Profile', date: '2024-02-15', doctor: 'Dr. Michael Ross', status: 'Attention', file: 'lipid_profile.pdf' },
    { id: 3, test: 'Thyroid Function Test', date: '2024-01-20', doctor: 'Dr. Emily White', status: 'Normal', file: 'thyroid_test.pdf' },
    { id: 4, test: 'Blood Glucose (Fasting)', date: '2023-12-05', doctor: 'Dr. Sarah Chen', status: 'Normal', file: 'glucose_test.pdf' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400';
      case 'Attention': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
      case 'Critical': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Lab Results</h1>
          <p className="text-secondary-500 dark:text-secondary-400">View and download your laboratory test reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
        <input
          type="text"
          placeholder="Search by test name or doctor..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-secondary-900 dark:text-white placeholder:text-secondary-400"
        />
      </div>

      {/* Results List */}
      <div className="grid gap-4">
        {results.map((result) => (
          <div key={result.id} className="bg-white dark:bg-secondary-900 rounded-xl p-6 border border-secondary-200 dark:border-secondary-800 hover:border-primary-500/50 transition-colors group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                  <Beaker className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900 dark:text-white text-lg">{result.test}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-secondary-500 dark:text-secondary-400">
                    <span>{result.doctor}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{result.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(result.status)}`}>
                  {result.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" title="Share">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" title="Download PDF">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;
