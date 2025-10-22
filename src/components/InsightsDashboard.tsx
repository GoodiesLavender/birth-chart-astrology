import { Sparkles, Gem, Palette, Briefcase, TrendingUp, TrendingDown, Heart, Users, Shirt, Sparkle } from 'lucide-react';
import { AstrologyInsights } from '../utils/astrology';

interface InsightsDashboardProps {
  fullName: string;
  zodiacSign: string;
  lifePathNumber: number;
  insights: AstrologyInsights;
  onReset: () => void;
}

export default function InsightsDashboard({
  fullName,
  zodiacSign,
  lifePathNumber,
  insights,
  onReset,
}: InsightsDashboardProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800">{fullName}</h1>
        <div className="flex items-center justify-center gap-6 text-lg">
          <div className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
            {zodiacSign}
          </div>
          <div className="px-6 py-2 bg-cyan-100 text-cyan-700 rounded-full font-semibold">
            Life Path {lifePathNumber}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightCard
          icon={<Gem className="w-6 h-6" />}
          title="Lucky Stones"
          items={insights.luckyStones}
          color="rose"
        />

        <InsightCard
          icon={<Palette className="w-6 h-6" />}
          title="Lucky Colors"
          items={insights.luckyColors}
          color="violet"
        />

        <InsightCard
          icon={<Briefcase className="w-6 h-6" />}
          title="Career Matches"
          items={insights.careerMatches.slice(0, 6)}
          color="amber"
        />

        <InsightCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Your Strengths"
          items={insights.strengths.slice(0, 6)}
          color="emerald"
        />

        <InsightCard
          icon={<TrendingDown className="w-6 h-6" />}
          title="Areas to Improve"
          items={insights.weaknesses}
          color="orange"
        />

        <InsightCard
          icon={<Heart className="w-6 h-6" />}
          title="Ideal Partner Traits"
          items={insights.partnerTraits}
          color="pink"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Compatible Signs</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {insights.compatibleSigns.map((sign, index) => (
            <div
              key={index}
              className="px-5 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold"
            >
              {sign}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-100 rounded-xl">
            <Shirt className="w-6 h-6 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Style & Fashion</h2>
        </div>
        <div className="grid gap-6">
          {insights.styleSuggestions.map((suggestion, index) => (
            <div key={index} className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
              <h3 className="font-bold text-lg text-slate-800 mb-2">{suggestion.category}</h3>
              <p className="text-slate-600 mb-3">{suggestion.description}</p>
              {suggestion.shopLink && (
                <a
                  href={suggestion.shopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-semibold"
                >
                  Shop Now
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-100 rounded-xl">
            <Sparkle className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Lucky Charms & Amulets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.luckyCharms.map((charm, index) => (
            <div key={index} className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
              <h3 className="font-bold text-lg text-slate-800 mb-2">{charm.name}</h3>
              <p className="text-slate-600">{charm.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Create Another Chart
        </button>
      </div>
    </div>
  );
}

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: 'rose' | 'violet' | 'amber' | 'emerald' | 'orange' | 'pink';
}

function InsightCard({ icon, title, items, color }: InsightCardProps) {
  const colorClasses = {
    rose: 'bg-rose-100 text-rose-600',
    violet: 'bg-violet-100 text-violet-600',
    amber: 'bg-amber-100 text-amber-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  const gradientClasses = {
    rose: 'from-rose-50 to-pink-50 border-rose-200',
    violet: 'from-violet-50 to-purple-50 border-violet-200',
    amber: 'from-amber-50 to-yellow-50 border-amber-200',
    emerald: 'from-emerald-50 to-green-50 border-emerald-200',
    orange: 'from-orange-50 to-amber-50 border-orange-200',
    pink: 'from-pink-50 to-rose-50 border-pink-200',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 ${colorClasses[color]} rounded-xl`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`px-4 py-2 bg-gradient-to-r ${gradientClasses[color]} border rounded-lg text-slate-700`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
