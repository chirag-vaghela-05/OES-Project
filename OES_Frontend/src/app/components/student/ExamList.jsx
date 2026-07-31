import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { FileText, Clock, PlayCircle } from 'lucide-react';
import axios from "axios";

export const ExamList = () => {
  const [papers, setPapers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {

    const paperResponse = await axios.get(
      "http://localhost:8080/admin/paper"
    );

    const allPapers = paperResponse.data;

    const now = new Date();

    const activePapers = allPapers.filter((p) => {
      const start = new Date(p.publishStart);
      const end = new Date(p.publishEnd);

      return now >= start && now <= end;
    });

    setPapers(activePapers);

    // temporary because attempts are not connected with backend yet
    setAttempts([]);

  } catch(error) {
    console.log(error);
  }
};

  const getAttemptCount = (paperId) => {
    return attempts.filter(a => a.paperId === paperId).length;
  };

  const canAttempt = (paper) => {
    const attemptCount = getAttemptCount(paper.id);
    return attemptCount < paper.maxAttempts;
  };

  const startExam = (paperId) => {
    navigate(`/student/exam/${paperId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Available Exams</h2>
        <p className="text-gray-500 mt-1">Take your exams below</p>
      </div>

      {papers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No active exams available at the moment</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {papers.map((paper) => {
            const attemptCount = getAttemptCount(paper.id);
            const canTake = canAttempt(paper);
            
            return (
              <Card key={paper.id}>
                <CardHeader>
                  <CardTitle>{paper.title}</CardTitle>
                  <CardDescription>
                    Attempt {attemptCount} of {paper.maxAttempts}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{paper.durationMinutes} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>{paper.paper_question?.length || 0} questions</span>
                    </div>
                  </div>
                  
                  {!canTake && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
                      You have exhausted all attempts for this exam
                    </div>
                  )}
                  
                  <Button
                    className="w-full"
                    onClick={() => startExam(paper.id)}
                    disabled={!canTake}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {canTake ? 'Start Exam' : 'No Attempts Left'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
