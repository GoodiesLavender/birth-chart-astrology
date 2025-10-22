export interface BirthData {
  fullName: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
}

export interface AstrologyInsights {
  luckyStones: string[];
  luckyColors: string[];
  careerMatches: string[];
  strengths: string[];
  weaknesses: string[];
  partnerTraits: string[];
  compatibleSigns: string[];
  styleSuggestions: { category: string; description: string; shopLink?: string }[];
  luckyCharms: { name: string; description: string }[];
}

export function calculateZodiacSign(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

export function calculateLifePathNumber(birthDate: string): number {
  const date = new Date(birthDate);
  const dateString = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  let sum = dateString.split('').reduce((acc, digit) => acc + parseInt(digit), 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return sum;
}

export function generateInsights(zodiacSign: string, lifePathNumber: number): AstrologyInsights {
  const zodiacData: Record<string, Partial<AstrologyInsights>> = {
    Aries: {
      luckyStones: ['Diamond', 'Bloodstone', 'Ruby'],
      luckyColors: ['Red', 'Scarlet', 'Carmine'],
      careerMatches: ['Entrepreneur', 'Military Officer', 'Athlete', 'Surgeon', 'Sales Professional'],
      strengths: ['Leadership', 'Courage', 'Determination', 'Confidence', 'Enthusiasm'],
      weaknesses: ['Impatience', 'Impulsiveness', 'Aggression', 'Short-tempered'],
      partnerTraits: ['Adventurous', 'Independent', 'Confident', 'Passionate'],
      compatibleSigns: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    },
    Taurus: {
      luckyStones: ['Emerald', 'Sapphire', 'Rose Quartz'],
      luckyColors: ['Green', 'Pink', 'Earth tones'],
      careerMatches: ['Banker', 'Chef', 'Architect', 'Fashion Designer', 'Agriculturist'],
      strengths: ['Reliability', 'Patience', 'Practicality', 'Devotion', 'Stability'],
      weaknesses: ['Stubbornness', 'Possessiveness', 'Materialism'],
      partnerTraits: ['Loyal', 'Sensual', 'Stable', 'Patient'],
      compatibleSigns: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    },
    Gemini: {
      luckyStones: ['Agate', 'Citrine', 'Tiger\'s Eye'],
      luckyColors: ['Yellow', 'Light Blue', 'White'],
      careerMatches: ['Journalist', 'Teacher', 'Writer', 'Public Relations', 'Interpreter'],
      strengths: ['Adaptability', 'Communication', 'Wit', 'Curiosity', 'Versatility'],
      weaknesses: ['Inconsistency', 'Indecisiveness', 'Nervousness'],
      partnerTraits: ['Intellectual', 'Communicative', 'Spontaneous', 'Fun-loving'],
      compatibleSigns: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    },
    Cancer: {
      luckyStones: ['Moonstone', 'Pearl', 'Ruby'],
      luckyColors: ['White', 'Silver', 'Sea Green'],
      careerMatches: ['Nurse', 'Interior Designer', 'Chef', 'Social Worker', 'Historian'],
      strengths: ['Intuition', 'Loyalty', 'Emotional depth', 'Compassion'],
      weaknesses: ['Moodiness', 'Over-sensitivity', 'Clinginess'],
      partnerTraits: ['Nurturing', 'Emotional', 'Protective', 'Family-oriented'],
      compatibleSigns: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    },
    Leo: {
      luckyStones: ['Peridot', 'Onyx', 'Ruby'],
      luckyColors: ['Gold', 'Orange', 'Yellow'],
      careerMatches: ['CEO', 'Actor', 'Politician', 'Event Manager', 'Fashion Designer'],
      strengths: ['Confidence', 'Creativity', 'Generosity', 'Leadership', 'Warmth'],
      weaknesses: ['Arrogance', 'Stubbornness', 'Self-centeredness'],
      partnerTraits: ['Loyal', 'Generous', 'Confident', 'Passionate'],
      compatibleSigns: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    },
    Virgo: {
      luckyStones: ['Sapphire', 'Jade', 'Carnelian'],
      luckyColors: ['Navy Blue', 'Grey', 'Beige'],
      careerMatches: ['Editor', 'Accountant', 'Scientist', 'Nutritionist', 'Analyst'],
      strengths: ['Analytical', 'Practical', 'Diligence', 'Reliability', 'Precision'],
      weaknesses: ['Perfectionism', 'Worry', 'Over-critical'],
      partnerTraits: ['Practical', 'Intelligent', 'Supportive', 'Loyal'],
      compatibleSigns: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    },
    Libra: {
      luckyStones: ['Opal', 'Lapis Lazuli', 'Peridot'],
      luckyColors: ['Pink', 'Blue', 'Pastel shades'],
      careerMatches: ['Lawyer', 'Diplomat', 'Designer', 'Counselor', 'Art Curator'],
      strengths: ['Diplomacy', 'Fairness', 'Social skills', 'Charm', 'Balance'],
      weaknesses: ['Indecisiveness', 'Avoidance of confrontation', 'Self-pity'],
      partnerTraits: ['Balanced', 'Charming', 'Romantic', 'Diplomatic'],
      compatibleSigns: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    },
    Scorpio: {
      luckyStones: ['Topaz', 'Obsidian', 'Garnet'],
      luckyColors: ['Deep Red', 'Black', 'Maroon'],
      careerMatches: ['Detective', 'Psychologist', 'Researcher', 'Surgeon', 'Financial Advisor'],
      strengths: ['Passion', 'Resourcefulness', 'Bravery', 'Determination', 'Loyalty'],
      weaknesses: ['Jealousy', 'Secretiveness', 'Resentfulness'],
      partnerTraits: ['Intense', 'Passionate', 'Loyal', 'Mysterious'],
      compatibleSigns: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    },
    Sagittarius: {
      luckyStones: ['Turquoise', 'Topaz', 'Amethyst'],
      luckyColors: ['Purple', 'Blue', 'Turquoise'],
      careerMatches: ['Travel Guide', 'Philosopher', 'Coach', 'Professor', 'Publisher'],
      strengths: ['Optimism', 'Freedom-loving', 'Honesty', 'Enthusiasm', 'Adventure'],
      weaknesses: ['Impatience', 'Tactlessness', 'Overconfidence'],
      partnerTraits: ['Adventurous', 'Optimistic', 'Independent', 'Honest'],
      compatibleSigns: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    },
    Capricorn: {
      luckyStones: ['Garnet', 'Onyx', 'Ruby'],
      luckyColors: ['Brown', 'Black', 'Dark Green'],
      careerMatches: ['Manager', 'Architect', 'Government Official', 'Engineer', 'Administrator'],
      strengths: ['Responsibility', 'Discipline', 'Self-control', 'Ambition', 'Wisdom'],
      weaknesses: ['Pessimism', 'Stubbornness', 'Unforgiving nature'],
      partnerTraits: ['Ambitious', 'Responsible', 'Patient', 'Traditional'],
      compatibleSigns: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    },
    Aquarius: {
      luckyStones: ['Amethyst', 'Aquamarine', 'Garnet'],
      luckyColors: ['Electric Blue', 'Silver', 'Turquoise'],
      careerMatches: ['Inventor', 'Social Worker', 'Tech Innovator', 'Environmentalist', 'Astrologer'],
      strengths: ['Progressive', 'Independent', 'Humanitarian', 'Original', 'Intellectual'],
      weaknesses: ['Detachment', 'Unpredictability', 'Aloofness'],
      partnerTraits: ['Intellectual', 'Independent', 'Humanitarian', 'Unconventional'],
      compatibleSigns: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    },
    Pisces: {
      luckyStones: ['Aquamarine', 'Moonstone', 'Amethyst'],
      luckyColors: ['Sea Green', 'Lavender', 'Purple'],
      careerMatches: ['Artist', 'Musician', 'Therapist', 'Photographer', 'Spiritual Guide'],
      strengths: ['Compassion', 'Intuition', 'Creativity', 'Empathy', 'Wisdom'],
      weaknesses: ['Escapism', 'Over-sensitivity', 'Idealism'],
      partnerTraits: ['Romantic', 'Compassionate', 'Artistic', 'Intuitive'],
      compatibleSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    },
  };

  const numerologyData: Record<number, { careers: string[]; strengths: string[]; weaknesses: string[] }> = {
    1: {
      careers: ['Leadership roles', 'Entrepreneurship', 'Innovation'],
      strengths: ['Independence', 'Pioneer spirit', 'Originality'],
      weaknesses: ['Domineering', 'Impatience', 'Self-centeredness'],
    },
    2: {
      careers: ['Diplomacy', 'Counseling', 'Partnership roles'],
      strengths: ['Cooperation', 'Sensitivity', 'Peacemaking'],
      weaknesses: ['Over-dependency', 'Timidity', 'Indecisiveness'],
    },
    3: {
      careers: ['Creative arts', 'Communication', 'Entertainment'],
      strengths: ['Creativity', 'Expression', 'Optimism'],
      weaknesses: ['Scattered energy', 'Superficiality', 'Exaggeration'],
    },
    4: {
      careers: ['Building', 'Organization', 'Systems management'],
      strengths: ['Stability', 'Hard work', 'Practicality'],
      weaknesses: ['Rigidity', 'Narrow-mindedness', 'Stubbornness'],
    },
    5: {
      careers: ['Travel', 'Sales', 'Public relations'],
      strengths: ['Versatility', 'Freedom', 'Adaptability'],
      weaknesses: ['Restlessness', 'Irresponsibility', 'Inconsistency'],
    },
    6: {
      careers: ['Teaching', 'Healing', 'Community service'],
      strengths: ['Nurturing', 'Responsibility', 'Harmony'],
      weaknesses: ['Worry', 'Self-righteousness', 'Meddling'],
    },
    7: {
      careers: ['Research', 'Analysis', 'Spiritual work'],
      strengths: ['Wisdom', 'Introspection', 'Intuition'],
      weaknesses: ['Aloofness', 'Skepticism', 'Isolation'],
    },
    8: {
      careers: ['Business', 'Finance', 'Management'],
      strengths: ['Ambition', 'Authority', 'Material success'],
      weaknesses: ['Materialism', 'Control issues', 'Workaholism'],
    },
    9: {
      careers: ['Humanitarian work', 'Arts', 'Global affairs'],
      strengths: ['Compassion', 'Generosity', 'Idealism'],
      weaknesses: ['Emotional volatility', 'Impracticality', 'Martyrdom'],
    },
    11: {
      careers: ['Spiritual teaching', 'Inspiration', 'Counseling'],
      strengths: ['Intuition', 'Idealism', 'Inspiration'],
      weaknesses: ['Nervousness', 'Impracticality', 'Fanaticism'],
    },
    22: {
      careers: ['Master building', 'Large-scale projects', 'Visionary leadership'],
      strengths: ['Master builder', 'Practical idealism', 'Power'],
      weaknesses: ['Stress', 'Inner tension', 'Extremism'],
    },
    33: {
      careers: ['Master teaching', 'Healing', 'Selfless service'],
      strengths: ['Master teacher', 'Healing', 'Selfless service'],
      weaknesses: ['Martyrdom', 'Emotional burden', 'Unrealistic expectations'],
    },
  };

  const zodiacInfo = zodiacData[zodiacSign] || zodiacData.Aries;
  const numerologyInfo = numerologyData[lifePathNumber] || numerologyData[1];

  const combinedCareers = [...(zodiacInfo.careerMatches || []), ...numerologyInfo.careers];
  const combinedStrengths = [...(zodiacInfo.strengths || []), ...numerologyInfo.strengths];
  const combinedWeaknesses = [...(zodiacInfo.weaknesses || []), ...numerologyInfo.weaknesses];

  const styleSuggestions = [
    {
      category: 'Colors',
      description: `Wear ${(zodiacInfo.luckyColors || []).join(', ')} to enhance your natural energy`,
      shopLink: 'https://www.nordstrom.com',
    },
    {
      category: 'Jewelry',
      description: `Accessorize with ${(zodiacInfo.luckyStones || []).join(', ')} gemstones`,
      shopLink: 'https://www.etsy.com/market/gemstone_jewelry',
    },
    {
      category: 'Style',
      description: getStyleForZodiac(zodiacSign),
      shopLink: 'https://www.asos.com',
    },
  ];

  const luckyCharms = [
    {
      name: `${zodiacSign} Talisman`,
      description: `A personalized ${zodiacSign} symbol to carry your zodiac energy`,
    },
    {
      name: `${(zodiacInfo.luckyStones || ['Crystal'])[0]} Crystal`,
      description: 'Amplifies your natural strengths and brings positive energy',
    },
    {
      name: 'Numerology Pendant',
      description: `A charm featuring your life path number ${lifePathNumber}`,
    },
    {
      name: 'Protection Amulet',
      description: 'Guards against negative energies and brings good fortune',
    },
  ];

  return {
    luckyStones: zodiacInfo.luckyStones || [],
    luckyColors: zodiacInfo.luckyColors || [],
    careerMatches: combinedCareers,
    strengths: combinedStrengths,
    weaknesses: combinedWeaknesses,
    partnerTraits: zodiacInfo.partnerTraits || [],
    compatibleSigns: zodiacInfo.compatibleSigns || [],
    styleSuggestions,
    luckyCharms,
  };
}

function getStyleForZodiac(zodiacSign: string): string {
  const styles: Record<string, string> = {
    Aries: 'Bold, sporty, and edgy styles with strong statement pieces',
    Taurus: 'Classic, comfortable, and luxurious fabrics with timeless elegance',
    Gemini: 'Versatile, trendy, and playful outfits that express duality',
    Cancer: 'Soft, romantic, and comfortable styles with vintage touches',
    Leo: 'Glamorous, dramatic, and bold fashion with luxurious details',
    Virgo: 'Clean, tailored, and sophisticated minimalist looks',
    Libra: 'Elegant, balanced, and harmonious styles with aesthetic appeal',
    Scorpio: 'Mysterious, intense, and powerful looks with dark sophistication',
    Sagittarius: 'Casual, eclectic, and adventurous bohemian styles',
    Capricorn: 'Professional, structured, and timeless conservative elegance',
    Aquarius: 'Unique, futuristic, and unconventional avant-garde fashion',
    Pisces: 'Dreamy, flowing, and ethereal styles with artistic flair',
  };
  return styles[zodiacSign] || 'Styles that express your unique personality';
}
