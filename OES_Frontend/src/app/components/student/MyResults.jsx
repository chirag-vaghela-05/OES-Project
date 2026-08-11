import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '../../context/AuthContext';
import {
  Eye,
  BarChart3
} from 'lucide-react';
import axios from 'axios';

export const MyResults = () => {

  const [results, setResults] = useState([]);
  const [papers, setPapers] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();


  // =========================================================
  // LOAD RESULTS
  // =========================================================

  useEffect(() => {

    if (user?.id) {
      loadData();
    }

  }, [user]);


  const loadData = async () => {

    try {

      // Get results of current student
      const resultResponse = await axios.get(
        `http://localhost:8080/student/${user.id}/result`
      );

      setResults(resultResponse.data);


      // Get papers to display exam titles
      const paperResponse = await axios.get(
        'http://localhost:8080/admin/paper'
      );

      setPapers(paperResponse.data);

    } catch (error) {

      console.error(
        'Error loading results:',
        error
      );

    }
  };


  // =========================================================
  // VIEW RESULT
  // =========================================================

  const viewResult = (attemptId) => {
    navigate(`/student/result/${attemptId}`);
};

  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          My Results
        </h1>

        <p className="text-gray-500">
          View your exam performance
        </p>

      </div>


      <Card>

        <CardHeader>

          <CardTitle>
            All Attempts ({results.length})
          </CardTitle>

        </CardHeader>


        <CardContent>

          {results.length === 0 ? (

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
                    Exam
                  </TableHead>

                  <TableHead>
                    Score
                  </TableHead>

                  <TableHead>
                    Percentage
                  </TableHead>

                  <TableHead>
                    Result
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

                {results.map((result) => {

                  const isPassed =
                    result.percentage >= 50;


                  const paper =
                    papers.find(
                      (paper) =>
                        paper.id === result.paperId
                    );


                  return (

                    <TableRow key={result.id}>

                      {/* Exam name */}

                      <TableCell>

                        {paper?.title ||
                          'Unknown Exam'}

                      </TableCell>


                      {/* Score */}

                      <TableCell>

                        <span className="font-medium">

                          {result.score}
                          {' / '}
                          {result.totalMarks}

                        </span>

                      </TableCell>


                      {/* Percentage */}

                      <TableCell>

                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            result.percentage >= 70
                              ? 'bg-green-100 text-green-700'
                              : result.percentage >= 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >

                          {Number(
                            result.percentage
                          ).toFixed(1)}
                          %

                        </span>

                      </TableCell>


                      {/* Pass / Fail */}

                      <TableCell>

                        <span
                          className={`font-medium ${
                            isPassed
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >

                          {isPassed
                            ? 'PASS'
                            : 'FAIL'}

                        </span>

                      </TableCell>


                      {/* Date */}

                      <TableCell>

                        {result.startTime
                          ? new Date(
                              result.startTime
                            ).toLocaleDateString()
                          : 'N/A'}

                      </TableCell>


                      {/* View result */}

                      <TableCell className="text-right">

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            viewResult(result.attemptId)
                          }
                        >

                          <Eye className="w-4 h-4 mr-2" />

                          View

                        </Button>

                      </TableCell>

                    </TableRow>

                  );

                })}

              </TableBody>

            </Table>

          )}

        </CardContent>

      </Card>

    </div>
  );
};