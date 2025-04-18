import React, { useRef } from 'react';
import { Share2, RefreshCw, Search, Mail, ChevronDown } from 'lucide-react';
import { QuizState, PersonalityType } from '../types';
import html2canvas from 'html2canvas';

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
  let maxCategory: keyof typeof categories = 'entertainment';
  let maxCount = 0;

  for (const [category, count] of Object.entries(categories)) {
    if (count > maxCount) {
      maxCount = count;
      maxCategory = category as keyof typeof categories;
    }
  }

  // Map category to personality type
  const personalityMap: Record<keyof typeof categories, PersonalityType> = {
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
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const handleShare = async () => {
    if (!resultsRef.current) return;
    
    try {
      // Show loading indicator or message
      const shareButton = document.querySelector('.share-button') as HTMLButtonElement;
      const originalText = shareButton.innerHTML;
      shareButton.innerHTML = '<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Capturing...';
      
      // Scroll to top to ensure we capture the whole page
      window.scrollTo(0, 0);
      
      // Wait a moment for any loading images
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Capture the results page as an image
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true,
        imageTimeout: 0, // No timeout for loading images
        ignoreElements: (element) => {
          // Ignore elements that shouldn't be in the screenshot
          return element.tagName === 'BUTTON' && element.textContent?.includes('Take Quiz Again') || false;
        },
        onclone: (documentClone) => {
          // Add watermark or any modifications to the cloned document before capture
          const watermark = documentClone.createElement('div');
          watermark.style.position = 'fixed';
          watermark.style.bottom = '10px';
          watermark.style.right = '10px';
          watermark.style.padding = '5px 10px';
          watermark.style.background = 'rgba(255,255,255,0.7)';
          watermark.style.borderRadius = '4px';
          watermark.style.fontSize = '12px';
          watermark.style.color = 'rgba(0,0,0,0.6)';
          watermark.textContent = 'yahoo-you.vercel.app';
          documentClone.body.appendChild(watermark);
          return documentClone;
        }
      });
      
      // Convert to blob with higher quality
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob as Blob);
        }, 'image/png', 0.9); // Higher quality
      });
      
      // Create share data with specific text
      const shareText = `Hey, see my personalized Yahoo! homepage. I'm ${personalityType}! You can create it too on @https://yahoo-you.vercel.app/`;
      
      // Try to use Web Share API with the image
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'yahoo-personality.png', { type: 'image/png' });
        const shareData = {
          title: 'My Yahoo You Results',
          text: shareText,
          url: 'https://yahoo-you.vercel.app/',
          files: [file]
        };
        
        try {
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
          } else {
            // Fallback if can't share with files
            await navigator.share({
              title: 'My Yahoo You Results',
              text: shareText,
              url: 'https://yahoo-you.vercel.app/'
            });
          }
        } catch (error) {
          console.error('Error sharing with files:', error);
          // Try download + clipboard approach
          fallbackShare(blob, shareText);
        }
      } else {
        // Fallback for browsers without Web Share API
        fallbackShare(blob, shareText);
      }
      
      // Reset button text
      shareButton.innerHTML = originalText;
    } catch (error) {
      console.error('Error capturing or sharing:', error);
      alert('Unable to share image. Please try again.');
      
      // Reset share button in case of error
      const shareButton = document.querySelector('.share-button') as HTMLButtonElement;
      if (shareButton) {
        shareButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Share Result';
      }
    }
  };
  
  const fallbackShare = async (blob: Blob, shareText: string) => {
    try {
      // Create a link to download the image
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'yahoo-personality.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Copy share text to clipboard
      await navigator.clipboard.writeText(shareText);
      alert('Image saved! Share text copied to clipboard.');
    } catch (error) {
      console.error('Fallback sharing error:', error);
      alert('To share your results, take a screenshot and share it with this text: ' + shareText);
    }
  };

  return (
    <div className="min-h-screen bg-white" ref={resultsRef}>
      {/* Yahoo Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img src="/yahoo-svgrepo-com.svg" alt="Yahoo" className="h-20 text-purple-600" style={{ filter: 'invert(24%) sepia(90%) saturate(1582%) hue-rotate(244deg) brightness(84%) contrast(96%)' }} />
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
                  className="share-button flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors w-full"
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