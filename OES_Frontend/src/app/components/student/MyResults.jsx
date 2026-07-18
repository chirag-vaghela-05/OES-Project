import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { Eye, BarChart3 } from 'lucide-react';

export const MyResults = () => {
  const [attempts, setAttempts] = useState([]);
  const [papers, setPapers] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allAttempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    const userAttempts = allAttempts.filter((a) => a.userId === user?.id);
    setAttempts(userAttempts);
    
    const allPapers = JSON.parse(localStorage.getItem('papers') || '[]');
    setPapers(allPapers);
  };

  const getPaperTitle = (paperId) => {
    return papers.find(p => p.id === paperId)?.title || 'Unknown Exam';
  };

  const viewResult = (attemptId) => {
    navigate(`/student/result/${attemptId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Results</h2>
        <p className="text-gray-500 mt-1">View your exam performance</p>
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
                  <TableHead>Exam</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((attempt) => {
                  const isPassed = attempt.percentage >= 50;
                  return (
                    <TableRow key={attempt.id}>
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
                      <TableCell>
                        <span className={`font-medium ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                          {isPassed ? 'PASS' : 'FAIL'}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(attempt.startTime).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => viewResult(attempt.id)}>
                          <Eye className="w-4 h-4 mr-1" />
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
