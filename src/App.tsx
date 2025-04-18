import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { questions } from './data/questions';
import { QuizQuestion } from './components/QuizQuestion';
import { ProgressBar } from './components/ProgressBar';
import { ResultsPage } from './components/ResultsPage';
import { QuizState } from './types';

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    isComplete: false,
  });

  const handleStartQuiz = () => {
    setQuizState({
      ...quizState,
      currentQuestion: 1,
    });
  };

  const handleAnswer = (answerId: string) => {
    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestion]: answerId,
      },
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < questions.length) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      setQuizState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    }
  };

  const handleRetake = () => {
    setQuizState({
      currentQuestion: 0,
      answers: {},
      isComplete: false,
    });
  };

  const currentQuestion = questions.find(q => q.id === quizState.currentQuestion);
  const showQuiz = quizState.currentQuestion > 0 && !quizState.isComplete;

  if (quizState.isComplete) {
    return <ResultsPage answers={quizState.answers} onRetake={handleRetake} />;
  }

  if (showQuiz && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-[#c52f33] to-purple-700 p-4">
        <div className="container mx-auto py-12 flex flex-col items-center justify-center min-h-screen">
          <ProgressBar
            current={quizState.currentQuestion}
            total={questions.length}
          />
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={quizState.answers[quizState.currentQuestion]}
          />
          {quizState.answers[quizState.currentQuestion] && (
            <button
              onClick={handleNext}
              className="mt-8 bg-white text-purple-700 hover:bg-purple-100 transition-all duration-300 rounded-full px-8 py-4 text-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {quizState.currentQuestion === questions.length ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-[#c52f33] to-purple-700">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen text-white">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* SCMS Bengaluru logo at the top */}
          <div className="mb-8">
            <img src="/symb.png" alt="SCMS Bengaluru Logo" className="h-24 mx-auto rounded-md" />
          </div>
          <p className="text-2xl md:text-3xl font-light mb-8">
            What does <span className="mx-2"></span><motion.img 
              src="/yahoo-svgrepo-com.svg" 
              alt="Yahoo" 
              className="inline-block h-20 invert brightness-0" 
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            /><span className="mx-2"></span> look like for YOU? 🫵🏻
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mb-12">
          <p className="text-xl mb-6 text-center">
            Take this fun quiz to discover your personalized Yahoo homepage! 🎯
          </p>
          <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-3 text-lg">
              <span>⏱️ Takes only 2 minutes</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-lg">
              <span>🎨 Get a custom homepage preview</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-lg">
              <span>🔄 Share with friends</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartQuiz}
          className="bg-white text-purple-700 hover:bg-purple-100 transition-all duration-300 rounded-full px-8 py-4 text-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Quiz
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Footer */}
        <p className="mt-12 text-sm text-white/80">
          Join thousands of others discovering their Yahoo personality! 🌟
        </p>
        
        {/* Credits Card */}
        <div className="mt-8 bg-white/15 backdrop-blur-md rounded-lg p-6 max-w-2xl w-full text-white text-center relative">
          <img 
            src="/symlogo.png" 
            alt="SCMS Logo" 
            className="absolute top-2 right-2 h-12 w-12 object-cover"
          />
          <div className="pt-4">
            <p className="font-medium mb-4">Made with ❤️ by :</p>
            <p className="mb-1">Ananya : 22021921014</p>
            <p className="mb-1">Sameera : 22021291043</p>
            <p className="mb-1">Garv : 22021921041</p>
            <p className="mb-1">Krish : 22021921061</p>
            <p className="mb-1">Pragati : 22021921088</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;