import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, XCircle, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export const ExamResult = () => {

  const { attemptId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);


  // =========================================================
  // LOAD RESULT
  // =========================================================

  useEffect(() => {

    if (user?.id && attemptId) {
      loadResult();
    }

  }, [user, attemptId]);


  const loadResult = async () => {

    try {

      setLoading(true);


      // =====================================================
      // 1. GET RESULT
      // =====================================================

      const resultResponse = await axios.get(
        `http://localhost:8080/student/${user.id}/result/${attemptId}`
      );

      const resultData = resultResponse.data;

      console.log("Result:", resultData);

      setResult(resultData);


      // =====================================================
      // 2. GET PAPER
      // =====================================================

      const paperResponse = await axios.get(
        `http://localhost:8080/admin/paper/${resultData.paperId}`
      );

      const paperData = paperResponse.data;

      console.log("Paper:", paperData);

      setPaper(paperData);

      setQuestions(
        paperData.paper_question || []
      );


      // =====================================================
      // 3. GET ANSWERS FOR THIS ATTEMPT
      // =====================================================

      const answersResponse = await axios.get(
        `http://localhost:8080/student/${user.id}/exam/${attemptId}/answers`
      );

      console.log(
        "Attempt answers:",
        answersResponse.data
      );

      setAnswers(
        answersResponse.data || []
      );


    } catch (error) {

      console.error(
        "Error loading result:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading result...
      </div>
    );

  }


  // =========================================================
  // RESULT NOT FOUND
  // =========================================================

  if (!result || !paper) {

    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">

        <p className="text-red-500">
          Result not found.
        </p>

        <Button
          onClick={() => navigate('/student')}
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Exams
        </Button>

      </div>
    );

  }


  // =========================================================
  // PASS / FAIL
  // =========================================================

  const isPassed =
    result.percentage >= 50;


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">


      {/* =====================================================
          RESULT SUMMARY
          ===================================================== */}

      <Card
        className={`border-2 ${
          isPassed
            ? 'border-green-500'
            : 'border-red-500'
        }`}
      >

        <CardHeader>

          <div className="flex items-center justify-center mb-4">

            {isPassed ? (

              <CheckCircle
                className="w-16 h-16 text-green-600"
              />

            ) : (

              <XCircle
                className="w-16 h-16 text-red-600"
              />

            )}

          </div>


          <CardTitle
            className={`text-3xl text-center ${
              isPassed
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >

            {isPassed
              ? 'Congratulations!'
              : 'Keep Trying!'}

          </CardTitle>


          <p className="text-center text-gray-500 mt-2">
            {paper.title}
          </p>

        </CardHeader>


        <CardContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">


            {/* SCORE */}

            <div>

              <p className="text-gray-500">
                Score
              </p>

              <p className="text-2xl font-bold">
                {result.score} / {result.totalMarks}
              </p>

            </div>


            {/* PERCENTAGE */}

            <div>

              <p className="text-gray-500">
                Percentage
              </p>

              <p
                className={`text-2xl font-bold ${
                  isPassed
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {result.percentage.toFixed(1)}%
              </p>

            </div>


            {/* RESULT */}

            <div>

              <p className="text-gray-500">
                Result
              </p>

              <p
                className={`text-2xl font-bold ${
                  isPassed
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {isPassed ? 'PASS' : 'FAIL'}
              </p>

            </div>

          </div>

        </CardContent>

      </Card>


      {/* =====================================================
          DETAILED REPORT
          ===================================================== */}

      <Card>

        <CardHeader>

          <CardTitle>
            Detailed Report
          </CardTitle>

        </CardHeader>


        <CardContent className="space-y-4">

          {answers.length === 0 ? (

            <div className="text-center py-8 text-gray-500">
              No answers found for this attempt.
            </div>

          ) : (

            answers.map((answer, index) => {

              // Get question ID from StudentAnswer
              const questionId =
                answer.question?.id;


              // Find question from paper
              const question =
                questions.find(
                  q => q.id === questionId
                );


              if (!question) {
                return null;
              }


              // Student's selected option
              const selectedAnswer =
                answer.selectedAnswer;


              // Correct option
              const correctAnswer =
                question.correctOption;


              // Check answer
              const isCorrect =
                selectedAnswer &&
                correctAnswer &&
                selectedAnswer.toUpperCase() ===
                correctAnswer.toUpperCase();


              return (

                <div
                  key={answer.id || questionId}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >

                  <div className="flex items-start space-x-3 mb-4">


                    {/* CORRECT / WRONG ICON */}

                    {isCorrect ? (

                      <CheckCircle
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-1"
                      />

                    ) : (

                      <XCircle
                        className="w-5 h-5 text-red-600 flex-shrink-0 mt-1"
                      />

                    )}


                    <div className="flex-1">


                      {/* QUESTION */}

                      <p className="font-medium">

                        Q{index + 1}. {question.text}

                      </p>


                      {/* ANSWER INFORMATION */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">


                        {/* STUDENT ANSWER */}

                        <div>

                          <span className="text-gray-600">
                            Your Answer:
                          </span>


                          {selectedAnswer ? (

                            <>

                              <p
                                className={`font-medium ${
                                  isCorrect
                                    ? 'text-green-700'
                                    : 'text-red-700'
                                }`}
                              >
                                Option {selectedAnswer}
                              </p>


                              <p className="text-xs text-gray-600 mt-1">

                                {
                                  question[
                                    `option${selectedAnswer}`
                                  ]
                                }

                              </p>

                            </>

                          ) : (

                            <p className="font-medium text-red-700">
                              Not Answered
                            </p>

                          )}

                        </div>


                        {/* CORRECT ANSWER */}

                        <div>

                          <span className="text-gray-600">
                            Correct Answer:
                          </span>


                          <p className="font-medium text-green-700">

                            Option {correctAnswer}

                          </p>


                          <p className="text-xs text-gray-600 mt-1">

                            {
                              question[
                                `option${correctAnswer}`
                              ]
                            }

                          </p>

                        </div>

                      </div>


                      {/* MARKS */}

                      <div className="mt-3">

                        {isCorrect ? (

                          <span className="text-sm font-medium text-green-600">
                            +{question.marks} marks
                          </span>

                        ) : (

                          <span className="text-sm font-medium text-red-600">
                            0 marks
                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                </div>

              );

            })

          )}

        </CardContent>

      </Card>


      {/* =====================================================
          BACK BUTTON
          ===================================================== */}

      <div className="flex justify-center">

        <Button
          onClick={() => navigate('/student')}
        >

          <Home className="w-4 h-4 mr-2" />

          Back to Exams

        </Button>

      </div>

    </div>

  );

};