import { useState } from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { BirthData } from '../utils/astrology';

interface BirthFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading?: boolean;
}

export default function BirthForm({ onSubmit, isLoading }: BirthFormProps) {
  const [formData, setFormData] = useState<BirthData>({
    fullName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof BirthData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <User className="w-4 h-4" />
          Full Name
        </label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Calendar className="w-4 h-4" />
          Date of Birth
        </label>
        <input
          type="date"
          required
          value={formData.birthDate}
          onChange={(e) => handleChange('birthDate', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Clock className="w-4 h-4" />
          Time of Birth
          <span className="text-xs text-slate-500 font-normal">(Optional)</span>
        </label>
        <input
          type="time"
          value={formData.birthTime}
          onChange={(e) => handleChange('birthTime', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <MapPin className="w-4 h-4" />
          Place of Birth
          <span className="text-xs text-slate-500 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={formData.birthPlace}
          onChange={(e) => handleChange('birthPlace', e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          placeholder="City, Country"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? 'Generating Your Chart...' : 'Reveal My Destiny'}
      </button>
    </form>
  );
}
