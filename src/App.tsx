import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import BirthForm from './components/BirthForm';
import InsightsDashboard from './components/InsightsDashboard';
import { supabase } from './lib/supabase';
import {
  BirthData,
  calculateZodiacSign,
  calculateLifePathNumber,
  generateInsights,
} from './utils/astrology';

interface ChartResult {
  fullName: string;
  zodiacSign: string;
  lifePathNumber: number;
  insights: ReturnType<typeof generateInsights>;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chartResult, setChartResult] = useState<ChartResult | null>(null);

  const handleSubmit = async (data: BirthData) => {
    setIsLoading(true);

    try {
      const zodiacSign = calculateZodiacSign(data.birthDate);
      const lifePathNumber = calculateLifePathNumber(data.birthDate);
      const insights = generateInsights(zodiacSign, lifePathNumber);

      const { data: birthChartData, error: chartError } = await supabase
        .from('birth_charts')
        .insert({
          full_name: data.fullName,
          birth_date: data.birthDate,
          birth_time: data.birthTime || null,
          birth_place: data.birthPlace || null,
          zodiac_sign: zodiacSign,
          life_path_number: lifePathNumber,
        })
        .select()
        .single();

      if (chartError) throw chartError;

      const { error: insightsError } = await supabase
        .from('astrology_insights')
        .insert({
          birth_chart_id: birthChartData.id,
          lucky_stones: insights.luckyStones,
          lucky_colors: insights.luckyColors,
          career_matches: insights.careerMatches,
          strengths: insights.strengths,
          weaknesses: insights.weaknesses,
          partner_traits: insights.partnerTraits,
          compatible_signs: insights.compatibleSigns,
          style_suggestions: insights.styleSuggestions,
          lucky_charms: insights.luckyCharms,
        });

      if (insightsError) throw insightsError;

      setChartResult({
        fullName: data.fullName,
        zodiacSign,
        lifePathNumber,
        insights,
      });
    } catch (error) {
      console.error('Error creating birth chart:', error);
      alert('An error occurred while generating your chart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setChartResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        {!chartResult ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-slate-800 mb-4">
                Discover Your Cosmic Blueprint
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Unlock personalized insights into your personality, career path, relationships, and life purpose through the ancient wisdom of astrology and numerology.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Enter Your Birth Details
              </h2>
              <BirthForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white/70 backdrop-blur rounded-2xl border border-slate-200">
                <div className="text-3xl mb-2">🌟</div>
                <h3 className="font-semibold text-slate-800 mb-2">Personalized Insights</h3>
                <p className="text-sm text-slate-600">Tailored guidance based on your unique birth chart</p>
              </div>
              <div className="p-6 bg-white/70 backdrop-blur rounded-2xl border border-slate-200">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-semibold text-slate-800 mb-2">Lucky Elements</h3>
                <p className="text-sm text-slate-600">Discover your stones, colors, and charms</p>
              </div>
              <div className="p-6 bg-white/70 backdrop-blur rounded-2xl border border-slate-200">
                <div className="text-3xl mb-2">❤️</div>
                <h3 className="font-semibold text-slate-800 mb-2">Love & Career</h3>
                <p className="text-sm text-slate-600">Find your ideal matches and career paths</p>
              </div>
            </div>
          </div>
        ) : (
          <InsightsDashboard
            fullName={chartResult.fullName}
            zodiacSign={chartResult.zodiacSign}
            lifePathNumber={chartResult.lifePathNumber}
            insights={chartResult.insights}
            onReset={handleReset}
          />
        )}
      </div>

      <footer className="text-center py-8 text-slate-600 text-sm">
        <p>✨ Your journey to self-discovery begins here ✨</p>
      </footer>
    </div>
  );
}

export default App;
