import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, XCircle, Home } from 'lucide-react';

export const ExamResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadResult();
  }, [attemptId]);

  const loadResult = () => {
    const attempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    const foundAttempt = attempts.find((a) => a.id === attemptId);
    
    if (!foundAttempt) return;

    const papers = JSON.parse(localStorage.getItem('papers') || '[]');
    const foundPaper = papers.find((p) => p.id === foundAttempt.paperId);

    const allQuestions = JSON.parse(localStorage.getItem('questions') || '[]');

    setAttempt(foundAttempt);
    setPaper(foundPaper);
    setQuestions(allQuestions);
  };

  if (!attempt || !paper) {
    return <div className="p-8">Loading...</div>;
  }

  const isPassed = attempt.percentage >= 50;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className={`border-2 ${isPassed ? 'border-green-500' : 'border-red-500'}`}>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {isPassed ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-3xl">
            {isPassed ? 'Congratulations!' : 'Keep Trying!'}
          </CardTitle>
          <p className="text-gray-500">{paper.title}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {attempt.score} / {attempt.totalMarks}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Percentage</p>
              <p className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {attempt.percentage.toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Result</p>
              <p className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {isPassed ? 'PASS' : 'FAIL'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attempt.answers.map((answer, index) => {
            const question = questions.find(q => q.id === answer.questionId);
            const isCorrect = answer.isCorrect;
            
            return (
              <div
                key={answer.questionId}
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start space-x-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium mb-2">
                      Q{index + 1}. {question?.text}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div>
                        <span className="text-gray-600">Your Answer: </span>
                        <span className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {answer.selectedOption ? `Option ${answer.selectedOption}` : 'Not Answered'}
                        </span>
                        {answer.selectedOption && question && (
                          <p className="text-xs text-gray-600 mt-1">
                            {question[`option${answer.selectedOption}`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="text-gray-600">Correct Answer: </span>
                        <span className="font-medium text-green-700">
                          Option {question?.correctOption}
                        </span>
                        {question && (
                          <p className="text-xs text-gray-600 mt-1">
                            {question[`option${question.correctOption}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={() => navigate('/student')}>
          <Home className="w-4 h-4 mr-2" />
          Back to Exams
        </Button>
      </div>
    </div>
  );
};
