import React, { useRef } from 'react';
import { Share2, RefreshCw, Search, Mail, ChevronDown, ShoppingBag, Play } from 'lucide-react';
import { QuizState, PersonalityType } from '../types';
import html2canvas from 'html2canvas';

type ResultsPageProps = {
  answers: Record<number, string>;
  onRetake: () => void;
};

// Layout preferences
type LayoutType = 'reading' | 'watching' | 'scrolling' | 'checking' | 'shopping';

// Video links for different categories
const videoLinks = {
  "The Tech Insider": [
    "https://youtu.be/2OpHbyN4vEM?si=JHL3Ln6w9e30mgMr",
    "https://youtu.be/ncjM7mY4LvE?si=ijiLd23hbYcaFo85"
  ],
  "The Entertainment Buff": [
    "https://youtu.be/zQdECIWK_i4?si=IHaU_tKLjOcVlOAy",
    "https://youtu.be/VK2Jr6MQVjQ?si=bYGPL1uT5UL7H_yc"
  ],
  "The News Junkie": [
    "https://youtu.be/UIS_sVlX7aE?si=WRjpMqTtAOD6WjvF",
    "https://youtu.be/FD8RFLCNrM0?si=4obmDBM5NHW16Zfi"
  ],
  "The Sports Fan": [
    "https://youtu.be/eTKYj_lXWZs?si=Wgxdmihq7gEMdZPf",
    "https://youtu.be/VlP8wmliWYU?si=NdoXcJx5wgthEFqb"
  ],
  "The Market Watcher": [
    "https://youtu.be/7bTvwdOrwWg?si=sfwy9bQ6vXi6KevL",
    "https://youtu.be/nhTlsm0at1w?si=h3_8mejgTvTz1_lG"
  ],
  "The Lifestyle Guru": [
    "https://youtu.be/DLT8JXafYu8?si=FthZLf4N41v0SDJW",
    "https://youtu.be/TWKmZ-gfchY?si=Ctzxv1NniA__BFRZ"
  ]
};

// Shopping website links for different categories
const shoppingLinks = {
  "The Tech Insider": [
    { title: "Latest Tech Gadgets", url: "https://www.amazon.com/Electronics/b?node=172282" },
    { title: "Smart Home Devices", url: "https://www.bestbuy.com/site/electronics/smart-home/pcmcat748302046851.c?id=pcmcat748302046851" }
  ],
  "The Entertainment Buff": [
    { title: "Streaming Subscriptions", url: "https://www.netflix.com/signup" },
    { title: "Entertainment Merchandise", url: "https://shop.hbo.com/" }
  ],
  "The News Junkie": [
    { title: "Digital News Subscriptions", url: "https://www.nytimes.com/subscription" },
    { title: "Political Books", url: "https://www.barnesandnoble.com/b/books/political-science/_/N-29Z8q8Z1fZ19" }
  ],
  "The Sports Fan": [
    { title: "Team Merchandise", url: "https://www.fanatics.com/" },
    { title: "Sports Equipment", url: "https://www.dickssportinggoods.com/" }
  ],
  "The Market Watcher": [
    { title: "Investment Books", url: "https://www.amazon.com/Business-Money-Investing-Books/b?node=2665" },
    { title: "Trading Tools", url: "https://www.tradingview.com/gopro/" }
  ],
  "The Lifestyle Guru": [
    { title: "Wellness Products", url: "https://www.amazon.com/Wellness/b?node=10079996011" },
    { title: "Yoga Gear", url: "https://www.lululemon.com/en-us/c/yoga" }
  ]
};

// Social media photos for different categories
const socialMediaPhotos = {
  "The Tech Insider": "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1974&auto=format&fit=crop",
  "The Entertainment Buff": "https://images.unsplash.com/photo-1586899028174-e7098604235b?q=80&w=1974&auto=format&fit=crop",
  "The News Junkie": "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=80&w=1975&auto=format&fit=crop",
  "The Sports Fan": "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1974&auto=format&fit=crop",
  "The Market Watcher": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1974&auto=format&fit=crop",
  "The Lifestyle Guru": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1995&auto=format&fit=crop"
};

// News content for different personality types
const personalityNews = {
  "The Tech Insider": {
    featured: {
      title: "Tech shares fall after Nvidia says new US controls on exports of AI chip will cost it $5.5 billion",
      description: "Nvidia CEO Jensen Huang addresses AI chip export restrictions as tech stocks experience significant downturn in response to the news.",
      image: "https://images.indianexpress.com/2025/03/Jensen-Huang-at-GTC-2025.jpg?w=640"
    },
    gridItems: [
      {
        title: "Apple CEO spoke with Lutnick about tariff impact on iPhone prices",
        description: "Tim Cook discusses the potential consequences of new tariffs on iPhone pricing strategy with analysts.",
        image: "https://www.reuters.com/resizer/v2/OI33MV5W7FIEPNDQJRYVWSGJ5U.jpg?auth=50e7bf01c8c07d383a14e1a594c26d8f8bdd0a26531b681a4112f43d0019c914&width=960&quality=80"
      },
      {
        title: "Technology and Innovation Report 2025",
        description: "UNCTAD's comprehensive report on global technology trends reveals surprising insights.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=300"
      }
    ]
  },
  "The Entertainment Buff": {
    featured: {
      title: "Kesari 2 Movie Review & Release Live update: Akshay Kumar, R Madhavan and Ananya Panday starrer expected to open at Rs 7-8 crore on day 1",
      description: "The highly anticipated sequel to Kesari is projected to have a strong opening weekend at the box office.",
      image: "https://static.toiimg.com/thumb/imgsize-1276159,msid-120396346,width-400,resizemode-4/120396346.jpg"
    },
    gridItems: [
      {
        title: "Samantha Ruth Prabhu-Varun Dhawan's Citadel Honey Bunny cancelled by Amazon; Priyanka Chopra's Citadel to release next year",
        description: "Amazon makes surprising decision to cancel the Indian spinoff of Citadel while the original series continues.",
        image: "https://images.indianexpress.com/2025/04/citadel.jpg?w=640"
      },
      {
        title: "Streaming Wars: New Platforms Emerge",
        description: "The battle for viewers intensifies as three new streaming services launch with exclusive content.",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&h=300"
      }
    ]
  },
  "The News Junkie": {
    featured: {
      title: "Fire services get 50% less than police to cover tax rises",
      description: "New report highlights significant funding disparity between emergency services despite similar operational challenges.",
      image: "https://ichef.bbci.co.uk/news/1536/cpsprodpb/7d60/live/317347f0-16ac-11f0-b2ad-f938cfcaf82c.png.webp"
    },
    gridItems: [
      {
        title: "Reform and Greens aim high in volatile mayoral contests",
        description: "Smaller political parties see opportunity in upcoming mayoral elections as voter sentiment shifts.",
        image: "https://ichef.bbci.co.uk/news/1536/cpsprodpb/2e68/live/8f89e750-1a2f-11f0-b287-9bbf4848835b.jpg.webp"
      },
      {
        title: "French Far-Right Protests Sweep Nation",
        description: "Far right rallies across France as Le Pen supporters protest public office ban.",
        image: "https://images.unsplash.com/photo-1534598974068-2d51eda7628f?auto=format&fit=crop&w=600&h=300"
      }
    ]
  },
  "The Sports Fan": {
    featured: {
      title: "Big summer if Liverpool keep team together - Slot",
      description: "New Liverpool manager optimistic about the club's future if key players remain with the team.",
      image: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/ca9e/live/a5bf20e0-1c3b-11f0-857e-c31f6e495ac8.jpg.webp"
    },
    gridItems: [
      {
        title: "From beer to betting - how have football shirt sponsors changed?",
        description: "Analysis of the evolution of football shirt sponsorships over the decades reveals shifting industry trends.",
        image: "https://ichef.bbci.co.uk/ace/standard/800/cpsprodpb/4e55/live/d070cf70-09b5-11f0-94d4-6f954f5dcfa3.png.webp"
      },
      {
        title: "Olympics 2025: Athletes to Watch",
        description: "The rising stars expected to make headlines at the upcoming Olympic Games.",
        image: "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/eyaq8uecbzcbpbvgsptc"
      }
    ]
  },
  "The Market Watcher": {
    featured: {
      title: "Rs 15,000 crore FII buying spree: A 1-week wonder or real reversal for India?",
      description: "Analysts debate whether the recent surge in foreign institutional investment represents a lasting trend for Indian markets.",
      image: "https://www.financialexpress.com/wp-content/uploads/2025/04/Untitled-design-79.jpg?w=1024"
    },
    gridItems: [
      {
        title: "Adani Ports buys Australian terminal in $2.5-billion non-cash deal",
        description: "Adani Group expands international footprint with strategic acquisition of major Australian port facility.",
        image: "https://www.financialexpress.com/wp-content/uploads/2025/04/adani.rutrss.jpg?w=1024"
      },
      {
        title: "Cryptocurrency Market Analysis",
        description: "Bitcoin reaches new all-time high as institutional adoption continues to grow.",
        image: "https://img.etimg.com/thumb/width-1600,height-900,imgsize-1093044,resizemode-75,msid-116002835/markets/cryptocurrency/bitcoin-hits-2-trillion-market-cap-now-bigger-than-tesla-facebook-and-saudi-aramco.jpg"
      }
    ]
  },
  "The Lifestyle Guru": {
    featured: {
      title: "Is sunscreen harmful? Experts bust viral myths and set the record straight",
      description: "Dermatologists address concerns and misinformation about sunscreen safety that have been circulating on social media.",
      image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202504/sunscreen-09013250-16x9_0.jpg?VersionId=SDfMDdKlXcvnqMUbuuaXmXQ_LTLAR9xZ&size=690:388"
    },
    gridItems: [
      {
        title: "What is 'brain flossing', and can it scientifically reduce stress?",
        description: "Exploring the science behind the trending wellness practice that claims to clear mental clutter and promote relaxation.",
        image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202503/the-trending-wellness-practice-that-aims-to-clear-mental-clutter-and-promote-relaxation-involves-lis-282152584-16x9_0.png?VersionId=zbIM3iE3O6jqJ1uULK6MAW5aS321cs85&size=690:388"
      },
      {
        title: "Mindfulness in the Digital Age",
        description: "How technology is helping rather than hindering our journey to better mental health.",
        image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&h=300"
      }
    ]
  }
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
  Object.entries(answers).forEach(([questionId, answer]) => {
    // Only consider answers to other questions for personality
    if (parseInt(questionId) !== 2) {
      if (answer === 'news' || answer === 'politics') categories.news++;
      if (answer === 'social' || answer === 'entertainment') categories.entertainment++;
      if (answer === 'tech' || answer === 'science') categories.tech++;
      if (answer === 'stocks' || answer === 'finance') categories.finance++;
      if (answer === 'sports') categories.sports++;
      if (answer === 'lifestyle') categories.lifestyle++;
    }
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

// Function to determine layout preference based on question 2
function determineLayoutPreference(answers: Record<number, string>): LayoutType {
  const layoutMap: Record<string, LayoutType> = {
    'articles': 'reading',
    'videos': 'watching',
    'social': 'scrolling',
    'email': 'checking',
    'shopping': 'shopping'
  };

  console.log('Answer to question 2:', answers[2]);
  console.log('Selected layout:', layoutMap[answers[2]] || 'reading');

  // Default to reading if no answer to question 2
  return layoutMap[answers[2]] || 'reading';
}

// Function to determine trending content based on question 4
function determineTrendingContent(answers: Record<number, string>) {
  switch (answers[4]) {
    case 'memes':
      return {
        title: 'Trending Memes',
        items: [
          { id: 1, text: 'When your code finally works and you don\'t know why', image: 'https://blog.photoadking.com/wp-content/uploads/2023/04/ff622ac12136b48098f04f9a1f1b290d-1.png' },
          { id: 2, text: 'Everyone on Monday morning', image: 'https://i.imgflip.com/91m42m.jpg' },
          { id: 3, text: 'New Year Resolution Memes', image: 'https://imgk.timesnownews.com/story/New_Year_2022_memes.png' },
          { id: 4, text: 'Popular TikTok format goes viral' },
          { id: 5, text: 'Sports fans react to controversial call' }
        ]
      };
    case 'horoscope':
      return {
        title: 'Daily Horoscope',
        items: [
          { id: 1, text: 'Aries: A surprise opportunity comes your way', image: 'https://i.scdn.co/image/ab67656300005f1f0b273c0bb21e0425319c3c49' },
          { id: 2, text: 'Taurus: Focus on self-care today', image: 'https://static.india.com/wp-content/uploads/2023/07/Horoscope-4-2.jpg' },
          { id: 3, text: 'Gemini: Communication is key to resolving conflict' },
          { id: 4, text: 'Cancer: Financial decisions should be made carefully' },
          { id: 5, text: 'Leo: Your creative energy is at an all-time high' }
        ]
      };
    case 'headlines':
      return {
        title: 'Top Headlines',
        items: [
          { id: 1, text: 'Tech shares fall after Nvidia export controls news' },
          { id: 2, text: 'Fire services get 50% less than police to cover tax rises' },
          { id: 3, text: 'Kesari 2 expected to open at Rs 7-8 crore on day 1' },
          { id: 4, text: 'Liverpool manager optimistic about keeping team together' },
          { id: 5, text: 'Rs 15,000 crore FII buying spree: Real reversal for India?' }
        ]
      };
    case 'scores':
      return {
        title: 'Match Scores',
        items: [
          { id: 1, text: 'MAN UTD 2-1 CHE (Premier League)', image: 'https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/1389F/production/_132212827_gettyimages-2078078459.jpg' },
          { id: 2, text: 'IND 325-4 vs AUS 287 (Cricket)' },
          { id: 3, text: 'LAL 112-98 GSW (NBA)' },
          { id: 4, text: 'Real Madrid 3-0 Barcelona (La Liga)' },
          { id: 5, text: 'BOS 4-2 TOR (NHL)' }
        ]
      };
    case 'gadgets':
      return {
        title: 'Tech Gadgets',
        items: [
          { id: 1, text: 'Apple announces M3 Ultra chip with up to 32 GPU cores', image: 'https://d3lzcn6mbbadaf.cloudfront.net/media/details/ANI-20230605194640.jpg' },
          { id: 2, text: 'Asus Zenbook S16 review: The ultimate ultrabook?', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202408/asus-zenbook-s16-275442374-16x9_0.jpg?VersionId=iIiE1tP4hXggJACnpWjUf1GqZNZz2xe8&size=690:388' },
          { id: 3, text: 'Samsung Galaxy Z Fold 6: Everything we know so far' },
          { id: 4, text: 'Sony launches new noise-cancelling headphones' },
          { id: 5, text: 'The best budget smartphones of 2025' }
        ]
      };
    case 'gossip':
      return {
        title: 'Celebrity Gossip',
        items: [
          { id: 1, text: 'Hollywood power couple announces surprise split', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs08KvCwra99g9pjN6poEVyoy_Jk4EcbRGew&s' },
          { id: 2, text: 'A-list actor spotted on vacation with mystery date', image: 'https://static.foxnews.com/foxnews.com/content/uploads/2021/09/Celebrity-News.jpg' },
          { id: 3, text: 'Famous singer cancels tour due to health concerns' },
          { id: 4, text: 'Reality TV stars in shocking on-set argument' },
          { id: 5, text: 'Award-winning actress lands major superhero role' }
        ]
      };
    default:
      return {
        title: 'Trending Now',
        items: [
          { id: 1, text: 'Trending Topic 1' },
          { id: 2, text: 'Trending Topic 2' },
          { id: 3, text: 'Trending Topic 3' },
          { id: 4, text: 'Trending Topic 4' },
          { id: 5, text: 'Trending Topic 5' }
        ]
      };
  }
}

export function ResultsPage({ answers, onRetake }: ResultsPageProps) {
  const personalityType = determinePersonalityType(answers);
  const layoutPreference = determineLayoutPreference(answers);
  const trendingContent = determineTrendingContent(answers);
  
  console.log('Answers:', answers);
  console.log('Personality Type:', personalityType);
  console.log('Layout Preference:', layoutPreference);
  console.log('Answer to question 4:', answers[4]);
  console.log('Trending Content Type:', trendingContent.title);
  console.log('Available Videos:', videoLinks[personalityType]);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Get news content for the user's personality type
  const newsContent = personalityNews[personalityType] || personalityNews["The Entertainment Buff"];
  
  // Get videos for user's personality type
  const videos = videoLinks[personalityType] || videoLinks["The Entertainment Buff"];
  
  // Get shopping links for user's personality type
  const shopping = shoppingLinks[personalityType] || shoppingLinks["The Entertainment Buff"];
  
  // Get social media photo for user's personality type
  const socialPhoto = socialMediaPhotos[personalityType] || socialMediaPhotos["The Entertainment Buff"];
  
  // Handle share functionality
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
        scale: 2, // Higher resolution for mobile
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
      const shareText = `Hey, see my personalized Yahoo! homepage. You can create it too on @https://yahoo-you.vercel.app/`;
      
      // Special handling for iOS Safari and other mobile browsers
      if (isMobile && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // iOS Safari typically supports sharing with files but sometimes has issues
        try {
          // First, copy the share text to clipboard to ensure it's available
          await navigator.clipboard.writeText(shareText);
          
          // Then share just the file - user can paste the text afterward
          const file = new File([blob], 'yahoo-personality.png', { type: 'image/png' });
          await navigator.share({ 
            files: [file]
          });
          
          // Alert user to paste the copied text
          setTimeout(() => {
            alert('Image shared! The share text is copied to your clipboard - paste it when sharing.');
          }, 1000);
        } catch (error) {
          console.error('iOS share error:', error);
          fallbackShare(blob, shareText);
        }
      }
      // Special handling for Android devices
      else if (isMobile && /Android/i.test(navigator.userAgent)) {
        try {
          // For Android, we'll try sharing just the text first to ensure it's included
          await navigator.clipboard.writeText(shareText);
          
          // Create the file object
          const file = new File([blob], 'yahoo-personality.png', { type: 'image/png' });
          
          // Try sharing with both text and files
          const shareData: ShareData = {
            title: 'My Yahoo Personality',
            text: shareText,
            files: [file]
          };
          
          // Note: We deliberately exclude URL on Android as it may prioritize the URL over the text
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
          } else {
            // Try sharing with just text
            await navigator.share({
              title: 'My Yahoo Personality',
              text: shareText
            });
            
            // Download the image since we couldn't share it
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'yahoo-personality.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (error) {
          console.error('Android share error:', error);
          fallbackShare(blob, shareText);
        }
      }
      // Try to use Web Share API with the image for other devices
      else if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'yahoo-personality.png', { type: 'image/png' });
        
        // Try sharing with both text and file
        try {
          const shareData: ShareData = {
            title: 'My Yahoo Personality',
            text: shareText,
            url: 'https://yahoo-you.vercel.app/',
            files: [file]
          };
          
          // Check if we can share with files
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
          } else {
            // Fallback to text-only sharing
            await navigator.share({
              title: 'My Yahoo Personality',
              text: shareText,
              url: 'https://yahoo-you.vercel.app/'
            });
            
            // Also download the image since we couldn't share it directly
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'yahoo-personality.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (error) {
          console.error('Error sharing with files:', error);
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
  
  // YouTube Video Embed Component
  const YouTubeEmbed = ({ videoUrl }: { videoUrl: string }) => {
    // Extract video ID from URL
    const getVideoId = (url: string) => {
      console.log('Processing video URL:', url);
      const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/;
      const matches = url.match(regex);
      const videoId = matches && matches[1] ? matches[1] : '';
      console.log('Extracted video ID:', videoId);
      return videoId;
    };
    
    const videoId = getVideoId(videoUrl);
    
    // If no valid video ID was found, show an error message
    if (!videoId) {
      console.error('Invalid YouTube URL:', videoUrl);
      return (
        <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
          <p>Could not load video. Invalid YouTube URL.</p>
          <p className="text-sm mt-2">{videoUrl}</p>
        </div>
      );
    }
    
    return (
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-sm">
        <iframe 
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  
  // Shopping Link Component
  const ShoppingLink = ({ title, url }: { title: string, url: string }) => {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <p className="mt-3 text-gray-600 text-sm">Browse the best deals</p>
      </a>
    );
  };

  // Render main content based on layout preference
  const renderMainContent = () => {
    switch (layoutPreference) {
      case 'reading':
        // Default layout - Article with two grid items
        return (
          <>
            {/* Featured Story */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <img
                src={newsContent.featured.image}
                alt="Featured news"
                className="w-full h-[400px] object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{newsContent.featured.title}</h2>
                <p className="text-gray-600">{newsContent.featured.description}</p>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsContent.gridItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'watching':
        // Watching videos layout - 2 videos and 1 featured article
        console.log('Rendering watching layout');
        console.log('Videos available:', videos);
        
        return (
          <>
            {/* Featured Video */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Video</h2>
              {videos && videos.length > 0 ? (
                <YouTubeEmbed videoUrl={videos[0]} />
              ) : (
                <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600 text-center">
                  <p>No videos available for your personality type.</p>
                </div>
              )}
            </div>

            {/* Second Video */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
              {videos && videos.length > 1 ? (
                <YouTubeEmbed videoUrl={videos[1]} />
              ) : (
                <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600 text-center">
                  <p>No additional videos available.</p>
                </div>
              )}
            </div>

            {/* Featured Article */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <img
                src={newsContent.featured.image}
                alt="Featured news"
                className="w-full h-[300px] object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{newsContent.featured.title}</h2>
                <p className="text-gray-600">{newsContent.featured.description}</p>
              </div>
            </div>
          </>
        );

      case 'scrolling':
        // Social media layout - 1 article, 1 video, 1 photo
        return (
          <>
            {/* Featured Article */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <img
                src={newsContent.featured.image}
                alt="Featured news"
                className="w-full h-[300px] object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{newsContent.featured.title}</h2>
                <p className="text-gray-600">{newsContent.featured.description}</p>
              </div>
            </div>

            {/* Featured Video */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-bold">Trending Video</h2>
              </div>
              <YouTubeEmbed videoUrl={videos[0]} />
            </div>

            {/* Social Media Photo */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">Y!</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Yahoo! Trending</h3>
                    <p className="text-gray-500 text-sm">1h ago</p>
                  </div>
                </div>
              </div>
              <img
                src={socialPhoto}
                alt="Social media post"
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4">
                <p className="text-gray-800">Trending topic in {personalityType.split(' ').pop()?.replace('The ', '')}</p>
                <div className="flex items-center gap-4 mt-3 text-gray-500">
                  <span>1.2K Likes</span>
                  <span>245 Comments</span>
                  <span>89 Shares</span>
                </div>
              </div>
            </div>
          </>
        );

      case 'checking':
        // Email & updates layout - 2 images and 2 grid items
        return (
          <>
            {/* Featured Story with visual notification UI */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Yahoo! News Update</h3>
                    <p className="text-gray-500 text-sm">Today, 10:45 AM</p>
                  </div>
                </div>
                <span className="bg-purple-600 w-3 h-3 rounded-full"></span>
              </div>
              <img
                src={newsContent.featured.image}
                alt="Featured news"
                className="w-full h-[300px] object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{newsContent.featured.title}</h2>
                <p className="text-gray-600">{newsContent.featured.description}</p>
              </div>
            </div>

            {/* Second update */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Your Daily Briefing</h3>
                    <p className="text-gray-500 text-sm">Today, 8:30 AM</p>
                  </div>
                </div>
                <span className="bg-purple-600 w-3 h-3 rounded-full"></span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {newsContent.gridItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-md">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'shopping':
        // Shopping layout - 2 shopping links and 2 grid articles
        return (
          <>
            {/* Featured Story */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <img
                src={newsContent.featured.image}
                alt="Featured news"
                className="w-full h-[300px] object-cover rounded-t-xl"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{newsContent.featured.title}</h2>
                <p className="text-gray-600">{newsContent.featured.description}</p>
              </div>
            </div>

            {/* Shopping Links */}
            <h2 className="text-2xl font-bold mb-4">Recommended Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {shopping.map((item, index) => (
                <ShoppingLink key={index} title={item.title} url={item.url} />
              ))}
            </div>

            {/* News Grid */}
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsContent.gridItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      default:
        return null;
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
            {renderMainContent()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Your Result Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-2">
                Your Yahoo Personality:
              </h2>
              <h3 className="text-xl font-bold mb-4">{personalityType}! 🎉</h3>
              <p className="text-gray-600 mb-4">
                Based on your preferences, we've customized your Yahoo experience to match your interests.
              </p>
              <div className="bg-purple-50 p-3 rounded-lg mb-4">
                <p className="text-purple-800 text-sm">
                  <span className="font-bold">Layout:</span> Customized for {layoutPreference === 'reading' ? 'reading articles' : 
                    layoutPreference === 'watching' ? 'watching videos' : 
                    layoutPreference === 'scrolling' ? 'scrolling through social media' : 
                    layoutPreference === 'checking' ? 'checking emails & updates' : 
                    'shopping & browsing deals'}
                </p>
              </div>
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
              <h3 className="font-bold text-xl mb-4">{trendingContent.title}</h3>
              
              {/* Featured trending item with larger image for memes/visual content */}
              {trendingContent.items[0].image && 
                (answers[4] === 'memes' || answers[4] === 'horoscope' || answers[4] === 'gadgets' || answers[4] === 'gossip') && (
                <div className="mb-5">
                  <div className="relative w-full h-48 mb-3 overflow-hidden rounded-lg">
                    <img
                      src={trendingContent.items[0].image}
                      alt={trendingContent.items[0].text}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </div>
                  <p className="text-gray-700 font-medium">
                    {trendingContent.items[0].text}
                  </p>
                </div>
              )}
              
              {/* List of trending items */}
              <div className="space-y-5">
                {trendingContent.items.slice(answers[4] === 'memes' || answers[4] === 'horoscope' || 
                  answers[4] === 'gadgets' || answers[4] === 'gossip' ? 1 : 0).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-purple-600 font-bold min-w-6">{item.id}</span>
                    {item.image && (
                      <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.text}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-gray-700 hover:text-purple-600 cursor-pointer">
                      {item.text}
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