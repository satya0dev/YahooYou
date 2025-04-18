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
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-500 to-purple-300 p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-500 to-purple-300">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen text-white">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 flex items-center justify-center gap-3">
            <motion.svg
              width="320"
              height="96"
              viewBox="0 -184.5 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-white"
              initial={{ y: 0 }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <g>
                <path d="M0,34.6068096 L30.4746532,34.6068096 L48.1654477,79.9313997 L66.1145019,34.6068096 L95.8143758,34.6068096 L51.1354351,142.042875 L21.3064313,142.042875 L33.5737705,113.6343 L0,34.6068096 Z M126.676419,32.7989912 C103.820429,32.7989912 89.3578815,53.3306431 89.3578815,73.7331652 C89.3578815,96.718285 105.240858,114.925599 126.289029,114.925599 C142.042875,114.925599 147.98285,105.369987 147.98285,105.369987 L147.98285,112.859521 L174.583607,112.859521 L174.583607,34.6068096 L147.98285,34.6068096 L147.98285,41.7089533 C147.85372,41.7089533 141.268096,32.7989912 126.676419,32.7989912 Z M132.358134,57.979319 C142.946784,57.979319 148.37024,66.3727617 148.37024,73.8622951 C148.37024,81.9974779 142.559395,90.0035309 132.358134,90.0035309 C123.964691,90.0035309 116.346028,83.1596469 116.346028,74.2496847 C116.346028,65.2105927 122.415132,57.979319 132.358134,57.979319 Z M183.622699,112.859521 L183.622699,0 L211.385624,0 L211.385624,41.9672131 C211.385624,41.9672131 217.971248,32.7989912 231.788146,32.7989912 C248.704161,32.7989912 258.647163,45.4537201 258.647163,63.4027743 L258.647163,112.859521 L231.013367,112.859521 L231.013367,70.1175284 C231.013367,64.0484237 228.172509,58.1084489 221.586885,58.1084489 C214.872131,58.1084489 211.385624,64.0484237 211.385624,70.1175284 L211.385624,112.859521 L183.622699,112.859521 Z M306.037831,32.7989912 C279.824464,32.7989912 264.199748,52.6849937 264.199748,74.1205549 C264.199748,98.3969735 283.052711,115.054729 306.166961,115.054729 C328.506431,115.054729 348.005044,99.1717528 348.005044,74.5079445 C348.005044,47.5197982 327.473392,32.7989912 306.037831,32.7989912 Z M306.296091,58.1084489 C315.593443,58.1084489 321.920807,65.8562421 321.920807,73.991425 C321.920807,80.9644388 315.980832,89.6161412 306.296091,89.6161412 C297.386129,89.6161412 290.800504,82.5139975 290.800504,73.8622951 C290.800504,65.7271122 296.22396,58.1084489 306.296091,58.1084489 Z M394.233544,32.7989912 C368.020177,32.7989912 352.39546,52.6849937 352.39546,74.1205549 C352.39546,98.3969735 371.248424,115.054729 394.362673,115.054729 C416.702144,115.054729 436.200757,99.1717528 436.200757,74.5079445 C436.200757,47.5197982 415.798235,32.7989912 394.233544,32.7989912 Z M394.491803,58.1084489 C403.789155,58.1084489 410.11652,65.8562421 410.11652,73.991425 C410.11652,80.9644388 404.176545,89.6161412 394.491803,89.6161412 C385.581841,89.6161412 378.996217,82.5139975 378.996217,73.8622951 C378.996217,65.7271122 384.548802,58.1084489 394.491803,58.1084489 Z M458.152837,77.6070618 C468.354098,77.6070618 476.618411,85.8713745 476.618411,96.0726356 C476.618411,106.273897 468.354098,114.538209 458.152837,114.538209 C447.951576,114.538209 439.687264,106.273897 439.687264,96.0726356 C439.687264,85.8713745 447.951576,77.6070618 458.152837,77.6070618 Z M482.687516,70.8923077 L449.501135,70.8923077 L478.942749,7.10542736e-15 L512,7.10542736e-15 L482.687516,70.8923077 Z" />
              </g>
            </motion.svg>
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8">
            What does Yahoo look like for YOU?
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
      </div>
    </div>
  );
}

export default App;