import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import axios from "axios";

export const TakeExam = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attemptId] = useState(uuidv4());
  const [startTime] = useState(new Date().toISOString());

  useEffect(() => {
    loadExam();
  }, [paperId]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && paper) {
      handleSubmit();
    }
  }, [timeRemaining]);


  const loadExam = async () => {
  try {

    const response = await axios.get(
      `http://localhost:8080/admin/paper/${paperId}`
    );

    const foundPaper = response.data;

    setPaper(foundPaper);

    setQuestions(foundPaper.paper_question || []);

    setTimeRemaining(foundPaper.durationMinutes * 60);

  } catch(error) {
    console.log(error);
    toast.error("Exam not found");
    navigate('/student');
  }
};

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (confirm('Are you sure you want to submit your exam?')) {
      let score = 0;
      let totalMarks = 0;
      const answerDetails = questions.map(q => {
        totalMarks += q.marks;
        const isCorrect = answers[q.id] === q.correctOption;
        if (isCorrect) score += q.marks;
        
        return {
          questionId: q.id,
          selectedOption: answers[q.id] || null,
          isCorrect,
        };
      });

      const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;

      const attempt = {
        id: attemptId,
        userId: user?.id,
        paperId: paper.id,
        startTime,
        endTime: new Date().toISOString(),
        answers: answerDetails,
        score,
        totalMarks,
        percentage,
      };

      const attempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
      localStorage.setItem('examAttempts', JSON.stringify([...attempts, attempt]));

      toast.success('Exam submitted successfully!');
      navigate(`/student/result/${attemptId}`);
    }
  };

  if (!paper || questions.length === 0) {
    return <div className="p-8">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">{paper.title}</h2>
              <p className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              timeRemaining < 60 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="w-5 h-5" />
              <span className="font-mono font-bold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
          {currentQuestion.imageUrl && (
            <img src={currentQuestion.imageUrl} alt="Question" className="mt-4 rounded-lg max-h-64 object-contain" />
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
          >
            {['A', 'B', 'C', 'D'].map((option) => (
              <div key={option} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value={option} id={`option-${option}`} />
                <Label htmlFor={`option-${option}`} className="flex-1 cursor-pointer">
                  <span className="font-medium">{option}. </span>
                  {currentQuestion[`option${option}`]}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Exam
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <Button
                key={q.id}
                variant={index === currentQuestionIndex ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`${
                  answers[q.id] ? 'border-green-500 bg-green-50' : ''
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Answered: {Object.keys(answers).length} / {questions.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
