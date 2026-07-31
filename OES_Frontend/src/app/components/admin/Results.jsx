import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Eye, BarChart3 } from 'lucide-react';
import axios from "axios";
import { toast } from "sonner";

export const Results = () => {
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  

  useEffect(() => {
  loadResults();
}, []);
  

const loadResults = async () => {
  try {
    const response = await axios.get("http://localhost:8080/admin/result");
    setAttempts(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load results");
  }
};

 

  const viewDetails = (attempt) => {
    setSelectedAttempt(attempt);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Exam Results</h2>
        <p className="text-gray-500 mt-1">View all student exam attempts and scores</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Attempts ({attempts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No exam attempts yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Exam</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell>{getStudentName(attempt.userId)}</TableCell>
                    <TableCell>{getPaperTitle(attempt.paperId)}</TableCell>
                    <TableCell>{attempt.score} / {attempt.totalMarks}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-sm ${
                        attempt.percentage >= 70 ? 'bg-green-100 text-green-700' :
                        attempt.percentage >= 50 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {attempt.percentage.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>{new Date(attempt.startTime).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => viewDetails(attempt)}>
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

      <Dialog open={!!selectedAttempt} onOpenChange={() => setSelectedAttempt(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Attempt Details</DialogTitle>
          </DialogHeader>
          {selectedAttempt && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Student</p>
                  <p className="font-medium">{getStudentName(selectedAttempt.userId)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Exam</p>
                  <p className="font-medium">{getPaperTitle(selectedAttempt.paperId)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="font-medium">{selectedAttempt.score} / {selectedAttempt.totalMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p className="font-medium">{selectedAttempt.percentage.toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Question-wise Analysis</h3>
                {selectedAttempt.answers.map((answer, index) => {
                  const question = questions.find(q => q.id === answer.questionId);
                  const isCorrect = answer.selectedOption === question?.correctOption;
                  
                  return (
                    <div key={answer.questionId} className={`p-4 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <p className="font-medium mb-2">Q{index + 1}. {question?.text}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Your Answer: </span>
                          <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {answer.selectedOption}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Correct Answer: </span>
                          <span className="text-green-700">{question?.correctOption}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
