import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileQuestion, FileText, Users, CheckCircle } from 'lucide-react';

export const AdminHome = () => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalPapers: 0,
    totalStudents: 0,
    totalAttempts: 0,
  });

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem('questions') || '[]');
    const papers = JSON.parse(localStorage.getItem('papers') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const attempts = JSON.parse(localStorage.getItem('examAttempts') || '[]');

    setStats({
      totalQuestions: questions.length,
      totalPapers: papers.length,
      totalStudents: users.filter((u) => u.role === 'STUDENT').length,
      totalAttempts: attempts.length,
    });
  }, []);

  const statCards = [
    {
      title: 'Total Questions',
      value: stats.totalQuestions,
      icon: FileQuestion,
      color: 'bg-blue-500',
    },
    {
      title: 'Exam Papers',
      value: stats.totalPapers,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Attempts',
      value: stats.totalAttempts,
      icon: CheckCircle,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome to the admin portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            • Use the sidebar to navigate between different sections
          </p>
          <p className="text-sm text-gray-600">
            • Create and manage questions in the Questions section
          </p>
          <p className="text-sm text-gray-600">
            • Build exam papers from your question bank
          </p>
          <p className="text-sm text-gray-600">
            • View student results and performance analytics
          </p>
          <p className="text-sm text-gray-600">
            • Manage student accounts and permissions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
