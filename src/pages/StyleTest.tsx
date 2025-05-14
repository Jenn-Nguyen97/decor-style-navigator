
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  styleQuestions, 
  styleResults, 
  calculateStyleResult 
} from '@/services/styleTestService';
import PageHeader from '@/components/common/PageHeader';
import { ArrowRight, CheckCircle } from 'lucide-react';

const StyleTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const currentQuestion = styleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / styleQuestions.length) * 100;
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const handleNextQuestion = () => {
    if (!selectedOption) return;
    
    // Save the answer
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
    
    // Move to next question or show results
    if (currentQuestionIndex < styleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Calculate result
      const styleResult = calculateStyleResult(updatedAnswers);
      setResult(styleResult);
      setIsComplete(true);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] || null);
    }
  };
  
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setIsComplete(false);
    setResult(null);
  };
  
  if (isComplete && result) {
    const styleResult = styleResults[result];
    
    return (
      <div className="min-h-screen">
        <PageHeader 
          title="Your Style Results"
          description="Based on your answers, we've discovered your perfect decor aesthetic"
        />
        
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-semibold text-accent mb-4">
                {styleResult.name}
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                {styleResult.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={styleResult.image}
                  alt={styleResult.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-semibold mb-4">Key Characteristics</h3>
                <ul className="space-y-3 mb-6">
                  {styleResult.characteristics.map((characteristic, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span>{characteristic}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-serif font-semibold mb-4 mt-6">Recommendations</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Colors</h4>
                    <ul className="text-sm text-warm-gray space-y-1">
                      {styleResult.recommendations.colors.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Materials</h4>
                    <ul className="text-sm text-warm-gray space-y-1">
                      {styleResult.recommendations.materials.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg mb-6">
                Ready to find decor pieces that match your {styleResult.name} style?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href={`/gallery?style=${result}`}>
                    Browse {styleResult.name} Gallery
                  </a>
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Retake Style Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Discover Your Decor Style"
        description="Answer a few questions to find your perfect aesthetic"
      />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-warm-gray">
                Question {currentQuestionIndex + 1} of {styleQuestions.length}
              </span>
              <span className="text-sm font-medium text-accent">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-soft-beige rounded-full h-2.5">
              <div 
                className="bg-accent h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <h3 className="text-2xl font-serif font-semibold mb-6">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option) => (
              <div 
                key={option.id}
                className={`p-4 rounded-md border transition-all cursor-pointer hover:border-accent ${
                  selectedOption === option.id
                    ? 'border-accent bg-accent/5'
                    : 'border-soft-beige'
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${
                    selectedOption === option.id
                      ? 'border-accent bg-accent text-white'
                      : 'border-warm-gray'
                  }`}>
                    {selectedOption === option.id && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{option.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className="flex items-center"
            >
              {currentQuestionIndex < styleQuestions.length - 1 ? (
                <>Next<ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                'See Results'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleTest;
