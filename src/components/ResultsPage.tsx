import React from 'react';
import { Share2, RefreshCw, Search, Mail, ChevronDown } from 'lucide-react';
import { QuizState, PersonalityType } from '../types';

type ResultsPageProps = {
  answers: Record<number, string>;
  onRetake: () => void;
};

function determinePersonalityType(answers: Record<number, string>): PersonalityType {
  // Count the frequency of each category
  const categories = {
    news: 0,
    entertainment: 0,
    tech: 0,
    finance: 0,
    sports: 0,
    lifestyle: 0,
  };

  // Map answers to categories and count
  Object.values(answers).forEach(answer => {
    if (answer === 'news' || answer === 'politics') categories.news++;
    if (answer === 'social' || answer === 'entertainment') categories.entertainment++;
    if (answer === 'tech' || answer === 'science') categories.tech++;
    if (answer === 'stocks' || answer === 'finance') categories.finance++;
    if (answer === 'sports') categories.sports++;
    if (answer === 'lifestyle') categories.lifestyle++;
  });

  // Find the category with highest count
  const maxCategory = Object.entries(categories).reduce((a, b) => 
    categories[a as keyof typeof categories] > categories[b[0] as keyof typeof categories] ? a : b[0]
  );

  // Map category to personality type
  const personalityMap: Record<string, PersonalityType> = {
    news: "The News Junkie",
    entertainment: "The Entertainment Buff",
    tech: "The Tech Insider",
    finance: "The Market Watcher",
    sports: "The Sports Fan",
    lifestyle: "The Lifestyle Guru",
  };

  return personalityMap[maxCategory];
}

export function ResultsPage({ answers, onRetake }: ResultsPageProps) {
  const personalityType = determinePersonalityType(answers);
  
  const handleShare = async () => {
    const shareData = {
      title: 'My Yahoo You Results',
      text: `I'm ${personalityType}! Take the Yahoo You quiz to discover your personalized Yahoo homepage.`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('Share link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('To share your results, copy this URL: ' + window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Yahoo Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img src="/yahoo.png" alt="Yahoo" className="h-8" />
              <div className="relative flex-1 max-w-2xl">
                <input
                  type="text"
                  placeholder="Search the web"
                  className="w-full px-4 py-2 bg-gray-100 rounded-full pr-10"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-gray-700 hover:text-purple-600">News</a>
                <a href="#" className="text-gray-700 hover:text-purple-600">Finance</a>
                <a href="#" className="text-gray-700 hover:text-purple-600">Sports</a>
                <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-purple-600">
                  More
                  <ChevronDown className="w-4 h-4" />
                </a>
              </nav>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">
                <Mail className="w-5 h-5" />
                Mail
              </button>
              <button className="text-gray-700 hover:text-purple-600">Sign in</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured Story */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <img
                src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&h=600"
                alt="Space"
                className="w-full h-[400px] object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">Breaking: New Discovery in Space!</h2>
                <p className="text-gray-600">Scientists have made a groundbreaking discovery that could change our understanding of the universe...</p>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&h=300"
                  alt="Technology"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Latest in Tech: AI Breakthroughs</h3>
                  <p className="text-gray-600">New developments in artificial intelligence are pushing boundaries...</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?auto=format&fit=crop&w=600&h=300"
                  alt="Finance"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Market Watch: Global Trends</h3>
                  <p className="text-gray-600">Financial markets respond to new economic data...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Your Result Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                Your Yahoo Personality: {personalityType}! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Based on your preferences, we've customized your Yahoo experience to match your interests.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors w-full"
                >
                  <Share2 className="w-5 h-5" />
                  Share Result
                </button>
                <button
                  onClick={onRetake}
                  className="flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-colors w-full"
                >
                  <RefreshCw className="w-5 h-5" />
                  Take Quiz Again
                </button>
              </div>
            </div>

            {/* Trending Now */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-xl mb-4">Trending Now</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center gap-4">
                    <span className="text-purple-600 font-bold">{num}</span>
                    <p className="text-gray-700 hover:text-purple-600 cursor-pointer">
                      Trending Topic {num}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}