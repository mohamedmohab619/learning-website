import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    if (onComplete) {
      onComplete(correctAnswers, questions.length);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Quiz Complete!</h3>
          <div
            className="w-30 h-30 border-4 border-slate-200 rounded-full flex flex-col items-center justify-center mx-auto bg-slate-50"
            style={{ borderColor: getScoreColor(), width: '120px', height: '120px' }}
          >
            <span className="text-3xl font-bold text-slate-800">{score}</span>
            <span className="text-base text-slate-500">/{questions.length}</span>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg font-medium" style={{ color: getScoreColor() }}>
            {score === questions.length
              ? "Perfect! You got all questions correct!"
              : score >= questions.length * 0.8
                ? "Great job! You passed with flying colors!"
                : score >= questions.length * 0.6
                  ? "Good effort! Review the material and try again."
                  : "Don't worry! Review the lesson and retake the quiz."}
          </p>
        </div>

        <div className="text-left mb-8">
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={index} className="p-4 border border-slate-200 rounded-lg mb-3">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm font-semibold">Q{index + 1}</span>
                  <span>{question.question}</span>
                  <div className={`ml-auto ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  </div>
                </div>
                <div className="md:ml-10">
                  <p className="text-slate-500 mb-1">
                    Your answer: {question.options[userAnswer]}
                  </p>
                  {!isCorrect && (
                    <p className="text-green-600 font-medium">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-teal-600 inline-flex items-center gap-2" onClick={resetQuiz}>
            <RotateCcw size={16} />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          <div className="w-full h-2 bg-slate-200 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-slate-500 font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">{currentQ.question}</h3>

        <div className="flex flex-col gap-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`flex items-center gap-4 px-5 py-4 border-2 rounded-xl bg-white cursor-pointer transition-all text-left w-full ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-200 hover:border-teal-500 hover:bg-teal-50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                selectedAnswers[currentQuestion] === index
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-base text-slate-800 leading-relaxed">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 flex-col md:flex-row">
        <button
          className="px-6 py-3 bg-white text-teal-500 border-2 border-teal-500 rounded-lg font-semibold cursor-pointer transition-all hover:bg-teal-50 inline-flex items-center gap-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <button
          className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold cursor-pointer transition-colors hover:bg-teal-600 inline-flex items-center gap-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;

