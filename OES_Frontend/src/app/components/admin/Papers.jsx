import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Plus, FileText } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';
import axios from "axios";

export const Papers = () => {
  const [papers, setPapers] = useState([]);
  
  const [questions, setQuestions] = useState([]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    durationMinutes: 30,
    publishStart: new Date().toISOString().slice(0, 16),
    publishEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    randomize: false,
    maxAttempts: 1,
  });

 useEffect(() => {

    axios
        .get("http://localhost:8080/admin/questions")
        .then(res => setQuestions(res.data));

    loadPapers();

}, []);

 const loadPapers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/admin/paper");
        setPapers(response.data);
    } catch (error) {
        console.error(error);
        toast.error("Failed to load papers");
    }
};

  const handleQuestionSelect = (id) => {

    setSelectedQuestions(prev =>

        prev.includes(id)

            ? prev.filter(q => q !== id)

            : [...prev, id]

    );

};

  
 const handleSubmit = async (e) => {
    e.preventDefault();

    
  const newPaper = {
    title: formData.title,
    durationMinutes: formData.durationMinutes,
    maxAttempts: formData.maxAttempts,
    publishStart: formData.publishStart.split("T")[0],
    publishEnd: formData.publishEnd.split("T")[0],
    randomize: formData.randomize,
    marks: 0,

    questionIds: selectedQuestions
};

    try {

        await axios.post(
          "http://localhost:8080/admin/paper/create",
          newPaper
        );


        toast.success("Paper created successfully");

        loadPapers();
        resetForm();
        setIsDialogOpen(false);


    } catch(error){
        console.error(error);
        toast.error("Paper creation failed");
    }

};


  const resetForm = () => {
    setFormData({
      title: '',
      durationMinutes: 30,
      publishStart: new Date().toISOString().slice(0, 16),
      publishEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      randomize: false,
      maxAttempts: 1,
    });
      setSelectedQuestions([]);

};

  

 return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Exam Papers</h2>
        <p className="text-gray-500 mt-1">Create and manage exam papers</p>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Paper
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Exam Paper</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label htmlFor="title">Paper Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Midterm Examination"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  value={formData.durationMinutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      durationMinutes: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxAttempts">Max Attempts</Label>
                <Input
                  id="maxAttempts"
                  type="number"
                  min="1"
                  value={formData.maxAttempts}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxAttempts: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="flex items-end pb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={formData.randomize}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        randomize: !!checked,
                      })
                    }
                  />
                  <span className="text-sm">Randomize</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start">Publish Start</Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={formData.publishStart}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publishStart: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="end">Publish End</Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={formData.publishEnd}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publishEnd: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* Question Selection */}

            <div>
              <Label className="mb-2 block font-semibold">
                Select Questions
              </Label>

              <div className="border rounded-md max-h-64 overflow-y-auto p-3 space-y-3">

                {questions.length === 0 ? (
                  <p className="text-gray-500">
                    No questions available.
                  </p>
                ) : (
                  questions.map((question) => (
                    <div
                      key={question.id}
                      className="flex items-start space-x-3 border-b pb-2"
                    >
                      <Checkbox
                        checked={selectedQuestions.includes(question.id)}
                        onCheckedChange={() =>
                          handleQuestionSelect(question.id)
                        }
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {question.text}
                        </p>

                        <p className="text-sm text-gray-500">
                          Marks : {question.marks}
                        </p>
                      </div>
                    </div>
                  ))
                )}

              </div>
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-2">

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                Create Paper
              </Button>

            </div>

          </form>
        </DialogContent>
      </Dialog>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>
          All Exam Papers ({papers.length})
        </CardTitle>
      </CardHeader>

      <CardContent>
        {papers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No exam papers yet. Create your first paper!</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Max Attempts</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {papers.map((paper) => {
                const now = new Date();
                const start = new Date(paper.publishStart);
                const end = new Date(paper.publishEnd);

                const status =
                  now < start
                    ? "Scheduled"
                    : now > end
                    ? "Ended"
                    : "Active";

                return (
                  <TableRow key={paper.id}>
                    <TableCell>{paper.title}</TableCell>
                    <TableCell>{paper.durationMinutes} min</TableCell>

                    <TableCell>
                      {paper.paper_question
                        ? paper.paper_question.length
                        : 0}
                    </TableCell>

                    <TableCell>{paper.maxAttempts}</TableCell>

                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs ${
                          status === "Active"
                            ? "bg-green-100 text-green-700"
                            : status === "Scheduled"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {status}
                      </span>
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
