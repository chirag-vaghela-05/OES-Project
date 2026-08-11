import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

export const TakeExam = () => {

  const { paperId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Current exam attempt ID
  const [attemptId, setAttemptId] = useState(null);

  // Prevent multiple submissions
  const [isSubmitting, setIsSubmitting] = useState(false);


  // =========================================================
  // LOAD EXAM
  // =========================================================

  useEffect(() => {

    if (user?.id && paperId) {
      loadExam();
    }

  }, [paperId, user]);


  // =========================================================
  // TIMER
  // =========================================================

  useEffect(() => {

    if (
      !paper ||
      attemptId === null ||
      isSubmitting
    ) {
      return;
    }

    if (timeRemaining > 0) {

      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (timeRemaining === 0) {

      // Automatically submit when time finishes
      handleSubmit(true);
    }

  }, [
    timeRemaining,
    paper,
    attemptId,
    isSubmitting
  ]);


  // =========================================================
  // LOAD PAPER + START ATTEMPT
  // =========================================================

  const loadExam = async () => {

    try {

      // 1. Get paper
      const paperResponse = await axios.get(
        `http://localhost:8080/admin/paper/${paperId}`
      );

      const foundPaper = paperResponse.data;

      setPaper(foundPaper);

      setQuestions(
        foundPaper.paper_question || []
      );

      setTimeRemaining(
        foundPaper.durationMinutes * 60
      );


      // 2. START EXAM
      // Creates ExamAttempt in database
      const attemptResponse = await axios.post(
        `http://localhost:8080/student/${user.id}/available_exam/exam/${paperId}/start`
      );

      const attempt = attemptResponse.data;

      console.log(
        "Exam attempt created:",
        attempt
      );


      // 3. Store attempt ID
      setAttemptId(attempt.id);

      toast.success("Exam started");

    } catch (error) {

      console.error(
        "Error loading exam:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Exam could not be started"
      );

      navigate('/student');
    }
  };


  // =========================================================
  // SAVE ANSWER
  // =========================================================

  const handleAnswer = async (
    questionId,
    option
  ) => {

    // Update UI immediately
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: option
    }));


    // Attempt must exist
    if (!attemptId) {

      toast.error(
        "Exam attempt not found"
      );

      return;
    }


    try {

      // Save answer for this attempt
      await axios.post(
        `http://localhost:8080/student/${user.id}/available_exam/exam/${paperId}/submit/${attemptId}`,
        {
          student: {
            id: user.id
          },

          paper: {
            id: paperId
          },

          question: {
            id: questionId
          },

          selectedAnswer: option
        }
      );


      console.log(
        `Answer saved: Question ${questionId} = ${option}`
      );

    } catch (error) {

      console.error(
        "Error saving answer:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to save answer"
      );
    }
  };


  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNext = () => {

    if (
      currentQuestionIndex <
      questions.length - 1
    ) {

      setCurrentQuestionIndex(
        currentQuestionIndex + 1
      );
    }
  };


  // =========================================================
  // PREVIOUS QUESTION
  // =========================================================

  const handlePrevious = () => {

    if (currentQuestionIndex > 0) {

      setCurrentQuestionIndex(
        currentQuestionIndex - 1
      );
    }
  };


  // =========================================================
  // FINAL SUBMIT
  // =========================================================

  const handleSubmit = async (
    automaticSubmit = false
  ) => {

    // Attempt must exist
    if (!attemptId) {

      toast.error(
        "Exam attempt not found"
      );

      return;
    }


    // Prevent duplicate submission
    if (isSubmitting) {
      return;
    }


    // Confirmation for manual submission
    if (!automaticSubmit) {

      const confirmed = window.confirm(
        'Are you sure you want to submit your exam?'
      );

      if (!confirmed) {
        return;
      }
    }


    try {

      setIsSubmitting(true);


      // Answers are already saved
      // while the student selects them.

      // Final submit calculates result
      // for this particular attempt.
      const resultResponse = await axios.get(
        `http://localhost:8080/student/${user.id}/exam/${paperId}/final_submit/${attemptId}`
      );


      console.log(
        "Final result:",
        resultResponse.data
      );


      if (automaticSubmit) {

        toast.success(
          'Time is over. Exam submitted automatically!'
        );

      } else {

        toast.success(
          'Exam submitted successfully!'
        );
      }


      // Go to My Results
      navigate('/student/results');

    } catch (error) {

      console.error(
        "Error submitting exam:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to submit exam"
      );

      setIsSubmitting(false);
    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (
    !paper ||
    questions.length === 0
  ) {

    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }


  // =========================================================
  // CURRENT QUESTION
  // =========================================================

  const currentQuestion =
    questions[currentQuestionIndex];

  const progress =
    ((currentQuestionIndex + 1) /
      questions.length) * 100;

  const minutes =
    Math.floor(
      timeRemaining / 60
    );

  const seconds =
    timeRemaining % 60;


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Exam Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold">
            {paper.title}
          </h1>

          <p className="text-gray-500">
            Question {currentQuestionIndex + 1}
            {' '}
            of
            {' '}
            {questions.length}
          </p>

        </div>


        {/* Timer */}

        <div
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            timeRemaining < 60
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >

          <Clock className="w-5 h-5" />

          <span className="font-bold">

            {String(minutes).padStart(2, '0')}
            :
            {String(seconds).padStart(2, '0')}

          </span>

        </div>

      </div>


      {/* Progress */}

      <Progress value={progress} />


      {/* Current Question */}

      <Card>

        <CardHeader>

          <CardTitle className="text-xl">
            {currentQuestion.text}
          </CardTitle>

          {currentQuestion.imageUrl && (

            <img
              src={currentQuestion.imageUrl}
              alt="Question"
              className="mt-4 rounded-lg max-h-64 object-contain"
            />

          )}

        </CardHeader>


        <CardContent className="space-y-4">

          <RadioGroup
            value={
              answers[currentQuestion.id] || ''
            }

            onValueChange={(value) =>
              handleAnswer(
                currentQuestion.id,
                value
              )
            }
          >

            {['A', 'B', 'C', 'D'].map(
              (option) => (

                <div
                  key={option}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >

                  <RadioGroupItem
                    value={option}
                    id={`option-${option}`}
                  />

                  <Label
                    htmlFor={`option-${option}`}
                    className="flex-1 cursor-pointer"
                  >

                    <span className="font-medium">
                      {option}.
                    </span>

                    {' '}

                    {
                      currentQuestion[
                        `option${option}`
                      ]
                    }

                  </Label>

                </div>

              )
            )}

          </RadioGroup>


          {/* Navigation */}

          <div className="flex justify-between pt-4">

            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={
                currentQuestionIndex === 0 ||
                isSubmitting
              }
            >

              <ChevronLeft className="w-4 h-4 mr-2" />

              Previous

            </Button>


            {currentQuestionIndex ===
            questions.length - 1 ? (

              <Button
                onClick={() =>
                  handleSubmit(false)
                }

                disabled={isSubmitting}

                className="bg-green-600 hover:bg-green-700"
              >

                <CheckCircle className="w-4 h-4 mr-2" />

                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit Exam'}

              </Button>

            ) : (

              <Button
                onClick={handleNext}
                disabled={isSubmitting}
              >

                Next

                <ChevronRight className="w-4 h-4 ml-2" />

              </Button>

            )}

          </div>

        </CardContent>

      </Card>


      {/* Question Navigator */}

      <Card>

        <CardHeader>

          <CardTitle className="text-sm">
            Question Navigator
          </CardTitle>

        </CardHeader>


        <CardContent>

          <div className="grid grid-cols-10 gap-2">

            {questions.map(
              (q, index) => (

                <Button
                  key={q.id}

                  variant={
                    index === currentQuestionIndex
                      ? 'default'
                      : 'outline'
                  }

                  size="sm"

                  onClick={() =>
                    setCurrentQuestionIndex(
                      index
                    )
                  }

                  disabled={isSubmitting}

                  className={`${
                    answers[q.id]
                      ? 'border-green-500 bg-green-50'
                      : ''
                  }`}
                >

                  {index + 1}

                </Button>
              )
            )}

          </div>


          <p className="text-xs text-gray-500 mt-4">

            Answered:
            {' '}
            {Object.keys(answers).length}
            {' '}
            /
            {' '}
            {questions.length}

          </p>

        </CardContent>

      </Card>

    </div>
  );
};