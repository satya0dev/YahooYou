import React from 'react';
import { QuizQuestion as QuizQuestionType } from '../types';
import * as Icons from 'lucide-react';

type QuizQuestionProps = {
  question: QuizQuestionType;
  onAnswer: (answerId: string) => void;
  selectedAnswer?: string;
};

export function QuizQuestion({ question, onAnswer, selectedAnswer }: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        {question.question}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const IconComponent = Icons[option.icon as keyof typeof Icons];
          return (
            <button
              key={option.id}
              onClick={() => onAnswer(option.id)}
              className={`
                p-6 rounded-xl text-left transition-all duration-300
                ${
                  selectedAnswer === option.id
                    ? 'bg-white text-purple-700 shadow-lg transform -translate-y-1'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {IconComponent && (
                  <IconComponent className="w-6 h-6" />
                )}
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}