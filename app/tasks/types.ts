interface CreateTaskRequest {
  title: string;
  description?: string;
  deadline?: string;
  tags? : string[];
  comments? : string[];
}

interface Task {
  id: string;
  description: string;
  status: string;
  comments: string[];
  tags: string[];
  deadline: string;
}