import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

import { Button } from '../ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

import {
  Eye,
  BarChart3
} from 'lucide-react';

import axios from 'axios';
import { toast } from 'sonner';


export const Results = () => {

  // =========================================================
  // STATE
  // =========================================================

  const [attempts, setAttempts] = useState([]);
  const [students, setStudents] = useState([]);
  const [papers, setPapers] = useState([]);

  const [selectedAttempt, setSelectedAttempt] = useState(null);


  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    loadResults();
  }, []);


  const loadResults = async () => {

    try {

      // Get all results
      const resultResponse = await axios.get(
        'http://localhost:8080/admin/result'
      );

      setAttempts(resultResponse.data);


      // Get all students
      const studentResponse = await axios.get(
        'http://localhost:8080/admin/studentlist'
      );

      setStudents(studentResponse.data);


      // Get all papers
      const paperResponse = await axios.get(
        'http://localhost:8080/admin/paper'
      );

      setPapers(paperResponse.data);


    } catch (error) {

      console.error(
        'Error loading results:',
        error
      );

      toast.error(
        'Failed to load results'
      );

    }

  };


  // =========================================================
  // GET STUDENT NAME
  // =========================================================

  const getStudentName = (studentId) => {

    const student = students.find(
      (student) =>
        student.id === studentId
    );

    return student
      ? student.name
      : 'Unknown Student';

  };


  // =========================================================
  // GET PAPER TITLE
  // =========================================================

  const getPaperTitle = (paperId) => {

    const paper = papers.find(
      (paper) =>
        paper.id === paperId
    );

    return paper
      ? paper.title
      : 'Unknown Exam';

  };


  // =========================================================
  // VIEW DETAILS
  // =========================================================

  const viewDetails = (attempt) => {

    setSelectedAttempt(attempt);

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold text-gray-900">
          Exam Results
        </h2>

        <p className="text-gray-500 mt-1">
          View all student exam attempts and scores
        </p>

      </div>


      <Card>

        <CardHeader>

          <CardTitle>
            All Attempts ({attempts.length})
          </CardTitle>

        </CardHeader>


        <CardContent>

          {attempts.length === 0 ? (

            <div className="text-center py-12 text-gray-500">

              <BarChart3
                className="w-12 h-12 mx-auto mb-4 text-gray-400"
              />

              <p>
                No exam attempts yet
              </p>

            </div>

          ) : (

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead>
                    Student
                  </TableHead>

                  <TableHead>
                    Exam
                  </TableHead>

                  <TableHead>
                    Score
                  </TableHead>

                  <TableHead>
                    Percentage
                  </TableHead>

                  <TableHead>
                    Date
                  </TableHead>

                  <TableHead className="text-right">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>


              <TableBody>

                {attempts.map((attempt) => (

                  <TableRow
                    key={attempt.id}
                  >

                    {/* STUDENT */}

                    <TableCell>

                      {getStudentName(
                        attempt.userId
                      )}

                    </TableCell>


                    {/* EXAM */}

                    <TableCell>

                      {getPaperTitle(
                        attempt.paperId
                      )}

                    </TableCell>


                    {/* SCORE */}

                    <TableCell>

                      {attempt.score}
                      {' / '}
                      {attempt.totalMarks}

                    </TableCell>


                    {/* PERCENTAGE */}

                    <TableCell>

                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          attempt.percentage >= 70
                            ? 'bg-green-100 text-green-700'
                            : attempt.percentage >= 50
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >

                        {Number(
                          attempt.percentage
                        ).toFixed(1)}

                        %

                      </span>

                    </TableCell>


                    {/* DATE */}

                    <TableCell>

                      {attempt.startTime
                        ? new Date(
                            attempt.startTime
                          ).toLocaleDateString()
                        : 'N/A'}

                    </TableCell>


                    {/* VIEW */}

                    <TableCell className="text-right">

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          viewDetails(attempt)
                        }
                      >

                        <Eye className="w-4 h-4 mr-1" />

                        View

                      </Button>

                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          )}

        </CardContent>

      </Card>


      {/* =====================================================
          RESULT DETAILS DIALOG
          ===================================================== */}

      <Dialog
        open={!!selectedAttempt}
        onOpenChange={() =>
          setSelectedAttempt(null)
        }
      >

        <DialogContent className="max-w-4xl">

          <DialogHeader>

            <DialogTitle>
              Result Details
            </DialogTitle>

          </DialogHeader>


          {selectedAttempt && (

            <div className="space-y-6">

              {/* SUMMARY */}

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">

                <div>

                  <p className="text-sm text-gray-600">
                    Student
                  </p>

                  <p className="font-medium">

                    {getStudentName(
                      selectedAttempt.userId
                    )}

                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-600">
                    Exam
                  </p>

                  <p className="font-medium">

                    {getPaperTitle(
                      selectedAttempt.paperId
                    )}

                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-600">
                    Score
                  </p>

                  <p className="font-medium">

                    {selectedAttempt.score}
                    {' / '}
                    {selectedAttempt.totalMarks}

                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-600">
                    Percentage
                  </p>

                  <p className="font-medium">

                    {Number(
                      selectedAttempt.percentage
                    ).toFixed(1)}

                    %

                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-600">
                    Result
                  </p>

                  <p
                    className={`font-medium ${
                      selectedAttempt.percentage >= 50
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >

                    {selectedAttempt.percentage >= 50
                      ? 'PASS'
                      : 'FAIL'}

                  </p>

                </div>


                <div>

                  <p className="text-sm text-gray-600">
                    Date
                  </p>

                  <p className="font-medium">

                    {selectedAttempt.startTime
                      ? new Date(
                          selectedAttempt.startTime
                        ).toLocaleDateString()
                      : 'N/A'}

                  </p>

                </div>

              </div>


              {/* NOTE */}

              <div className="text-center text-gray-500 py-4">

                <p>
                  Result summary displayed successfully.
                </p>

                <p className="text-sm mt-1">
                  Detailed question-wise analysis can be
                  connected to the attempt answers API next.
                </p>

              </div>

            </div>

          )}

        </DialogContent>

      </Dialog>

    </div>

  );

};