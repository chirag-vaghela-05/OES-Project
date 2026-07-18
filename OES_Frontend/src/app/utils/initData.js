import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const initializeDatabase = async () => {
  // Check if data already exists
  if (localStorage.getItem('users')) {
    return;
  }

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
  const student1PasswordHash = await bcrypt.hash('Student@123', 10);
  const student2PasswordHash = await bcrypt.hash('Student@123', 10);

  // Initialize Users
  const users = [
    {
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
    {
      id: uuidv4(),
      name: 'John Doe',
      email: 'student1@example.com',
      passwordHash: student1PasswordHash,
      role: 'STUDENT',
    },
    {
      id: uuidv4(),
      name: 'Jane Smith',
      email: 'student2@example.com',
      passwordHash: student2PasswordHash,
      role: 'STUDENT',
    },
  ];

  // Initialize Sample Questions
  const questions = [
    {
      id: uuidv4(),
      text: 'What is the capital of France?',
      optionA: 'London',
      optionB: 'Berlin',
      optionC: 'Paris',
      optionD: 'Madrid',
      correctOption: 'C',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'Which programming language is known as the "language of the web"?',
      optionA: 'Python',
      optionB: 'JavaScript',
      optionC: 'Java',
      optionD: 'C++',
      correctOption: 'B',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'What does HTML stand for?',
      optionA: 'Hyper Text Markup Language',
      optionB: 'High Tech Modern Language',
      optionC: 'Home Tool Markup Language',
      optionD: 'Hyperlinks and Text Markup Language',
      correctOption: 'A',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'Which data structure uses LIFO (Last In First Out)?',
      optionA: 'Queue',
      optionB: 'Stack',
      optionC: 'Array',
      optionD: 'Tree',
      correctOption: 'B',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'What is the time complexity of binary search?',
      optionA: 'O(n)',
      optionB: 'O(n²)',
      optionC: 'O(log n)',
      optionD: 'O(1)',
      correctOption: 'C',
      marks: 3,
      imageUrl: null,
      timePerQuestion: 90,
    },
    {
      id: uuidv4(),
      text: 'Which of the following is NOT a JavaScript framework?',
      optionA: 'React',
      optionB: 'Angular',
      optionC: 'Django',
      optionD: 'Vue',
      correctOption: 'C',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'What does CSS stand for?',
      optionA: 'Computer Style Sheets',
      optionB: 'Cascading Style Sheets',
      optionC: 'Creative Style Sheets',
      optionD: 'Colorful Style Sheets',
      correctOption: 'B',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'Which HTTP method is used to update data?',
      optionA: 'GET',
      optionB: 'POST',
      optionC: 'PUT',
      optionD: 'DELETE',
      correctOption: 'C',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    },
    {
      id: uuidv4(),
      text: 'What is the purpose of a database index?',
      optionA: 'To store data',
      optionB: 'To improve query performance',
      optionC: 'To delete data',
      optionD: 'To encrypt data',
      correctOption: 'B',
      marks: 3,
      imageUrl: null,
      timePerQuestion: 90,
    },
    {
      id: uuidv4(),
      text: 'In Object-Oriented Programming, what is inheritance?',
      optionA: 'Hiding implementation details',
      optionB: 'Creating multiple objects',
      optionC: 'A class acquiring properties from another class',
      optionD: 'Combining data and methods',
      correctOption: 'C',
      marks: 3,
      imageUrl: null,
      timePerQuestion: 90,
    },
  ];

  // Initialize Sample Exam Papers
  const papers = [
    {
      id: uuidv4(),
      title: 'General Knowledge Test',
      durationMinutes: 10,
      questionIds: [questions[0].id, questions[1].id, questions[2].id, questions[3].id, questions[4].id],
      publishStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      publishEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      randomize: false,
      maxAttempts: 2,
    },
    {
      id: uuidv4(),
      title: 'Programming Fundamentals',
      durationMinutes: 15,
      questionIds: [questions[5].id, questions[6].id, questions[7].id, questions[8].id, questions[9].id],
      publishStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      publishEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      randomize: false,
      maxAttempts: 1,
    },
  ];

  // Initialize Exam Attempts (empty initially)
  const examAttempts = [];

  // Store in localStorage
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('questions', JSON.stringify(questions));
  localStorage.setItem('papers', JSON.stringify(papers));
  localStorage.setItem('examAttempts', JSON.stringify(examAttempts));

  console.log('Database initialized with sample data');
};
