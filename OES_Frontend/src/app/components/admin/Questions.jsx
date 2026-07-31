import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, Edit, Trash2, FileQuestion } from 'lucide-react';
import { toast } from 'sonner';

export const Questions = () => {
  const API_BASE = "http://localhost:8080/admin";
  const [questions, setQuestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: 'A',
    marks: 2,
    imageUrl: null,
    timePerQuestion: 60,
    paperId: ''
  });

  const [papers, setPapers] = useState([]);



  useEffect(() => {
    loadQuestions();
    loadPapers();
  }, []);

  

  const loadQuestions = async () => {
  try {
    const res = await fetch(`${API_BASE}/questions`);
    const data = await res.json();
    setQuestions(data);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load questions");
  }
};

const loadPapers = async () => {
  try {
    const res = await fetch(`${API_BASE}/paper`);
    const data = await res.json();
    setPapers(data);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load papers");
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingQuestion) {
      // UPDATE
      await fetch(`${API_BASE}/questions/updatequestion`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingQuestion.id,
          ...formData,
        }),
      });

      toast.success("Question updated!");
    } else {
      // CREATE
      await fetch(`${API_BASE}/questions/addquestion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      toast.success("Question created!");
    }

    loadQuestions();
    setIsDialogOpen(false);
    resetForm();

  } catch (err) {
    console.error(err);
    toast.error("Operation failed");
  }
};
  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData(question);
    setIsDialogOpen(true);
  };

  


  const handleDelete = async (id) => {
  if (confirm("Are you sure?")) {
    try {
      await fetch(`${API_BASE}/questions/deletequestion/${id}`, {
        method: "DELETE",
      });

      toast.success("Deleted successfully!");
      loadQuestions();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  }
};
  const resetForm = () => {
    setEditingQuestion(null);
    setFormData({
      text: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: 'A',
      marks: 2,
      imageUrl: null,
      timePerQuestion: 60,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Questions</h2>
          <p className="text-gray-500 mt-1">Manage your question bank</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="text">Question Text *</Label>
                <Input
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                  placeholder="Enter question text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="optionA">Option A *</Label>
                  <Input
                    id="optionA"
                    value={formData.optionA}
                    onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="optionB">Option B *</Label>
                  <Input
                    id="optionB"
                    value={formData.optionB}
                    onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="optionC">Option C *</Label>
                  <Input
                    id="optionC"
                    value={formData.optionC}
                    onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="optionD">Option D *</Label>
                  <Input
                    id="optionD"
                    value={formData.optionD}
                    onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="correctOption">Correct Answer *</Label>
                  <select
                    id="correctOption"
                    value={formData.correctOption}
                    onChange={(e) => setFormData({ ...formData, correctOption: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="marks">Marks *</Label>
                  <Input
                    id="marks"
                    type="number"
                    min="1"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="timePerQuestion">Time (seconds)</Label>
                  <Input
                    id="timePerQuestion"
                    type="number"
                    min="30"
                    value={formData.timePerQuestion}
                    onChange={(e) => setFormData({ ...formData, timePerQuestion: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value || null })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingQuestion ? 'Update' : 'Create'} Question
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Questions ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileQuestion className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No questions yet. Create your first question!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-md">
                      <div className="truncate">{question.text}</div>
                    </TableCell>
                    <TableCell>Option {question.correctOption}</TableCell>
                    <TableCell>{question.marks}</TableCell>
                    <TableCell>{question.timePerQuestion}s</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(question)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(question.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
