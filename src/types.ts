export type QuizQuestion = {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    icon?: string;
  }[];
};

export type PersonalityType = 
  | "The News Junkie"
  | "The Entertainment Buff" 
  | "The Tech Insider"
  | "The Market Watcher"
  | "The Sports Fan"
  | "The Lifestyle Guru";

export type QuizState = {
  currentQuestion: number;
  answers: Record<number, string>;
  isComplete: boolean;
  personalityType?: PersonalityType;
};

// Extend the ShareData interface to include files for Web Share API Level 2
declare global {
  interface ShareData {
    files?: File[];
  }
}