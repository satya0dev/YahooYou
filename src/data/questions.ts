import { QuizQuestion } from '../types';

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What kind of news grabs your attention first?",
    options: [
      { id: "tech", text: "Tech & Innovation" },
      { id: "entertainment", text: "Entertainment & Celebs" },
      { id: "politics", text: "Politics & World Affairs" },
      { id: "sports", text: "Sports & Scores" },
      { id: "finance", text: "Finance & Markets" },
      { id: "lifestyle", text: "Lifestyle & Wellness" },
    ],
  },
  {
    id: 2,
    question: "How do you usually spend time online?",
    options: [
      { id: "articles", text: "Reading articles" },
      { id: "videos", text: "Watching videos" },
      { id: "social", text: "Scrolling through social media" },
      { id: "email", text: "Checking emails & updates" },
      { id: "shopping", text: "Shopping & browsing deals" },
    ],
  },
  {
    id: 3,
    question: "What’s your ideal homepage vibe?",
    options: [
      { id: "minimalist", text: "Clean and minimalist" },
      { id: "colorful", text: "Bright and colorful" },
      { id: "packed", text: "Packed with updates" },
      { id: "chill", text: "Chill and relaxing" },
      { id: "trendy", text: "Trendy and stylish" },
    ],
  },
  {
    id: 4,
    question: "Pick a content type you never skip:",
    options: [
      { id: "memes", text: "Trending memes" },
      { id: "horoscope", text: "Daily horoscope" },
      { id: "headlines", text: "Top headlines" },
      { id: "scores", text: "Match scores" },
      { id: "gadgets", text: "Tech gadgets" },
      { id: "gossip", text: "Celebrity gossip" },
    ],
  },
  {
    id: 5,
    question: "How often do you check the news?",
    options: [
      { id: "hourly", text: "Every hour" },
      { id: "daily", text: "Once or twice a day" },
      { id: "major", text: "Only when something major happens" },
      { id: "rarely", text: "Rarely – I rely on social media" },
      { id: "skim", text: "I skim through headlines in the morning" },
    ],
  },
  {
    id: 6,
    question: "Choose a tagline that fits you best:",
    options: [
      { id: "fast", text: "I want info fast and fresh." },
      { id: "viral", text: "If it’s viral, I’m on it." },
      { id: "ahead", text: "I like to stay ahead of the curve." },
      { id: "chill", text: "Chill vibes only, please." },
      { id: "fun", text: "Give me news with a splash of fun." },
    ],
  },
  {
    id: 7,
    question: "What’s your spirit animal for browsing? (Bonus)",
    options: [
      { id: "owl", text: "Owl (Wise & Focused)" },
      { id: "cat", text: "Cat (Curious & Chill)" },
      { id: "fox", text: "Fox (Fast & Sharp)" },
      { id: "parrot", text: "Parrot (Chatty & Social)" },
      { id: "dolphin", text: "Dolphin (Smart & Playful)" },
    ],
  },
];