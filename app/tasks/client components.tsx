'use client'

import { useEffect, useState } from "react";
import { createTask, listAllTasks } from "./server-actions";
import { Button } from "@/components/ui/button";
import { isValidTitle, isValidDate, decodeTitle } from "./utils";
import { Tasks } from "@/src/xata";

export function CreateTaskForm() {
  const [title, setTitle] = useState<string>("");
  const [titleValid, setTitleValid] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");

  const [deadline, setDeadline] = useState<string>("");
  const [deadlineValid, setDeadlineValid] = useState<boolean>(false);

  const [tags, setTags] = useState<string[]>(['']);

  useEffect(() => {
    setTitleValid(isValidTitle(title));
  },[title])

  useEffect(() => {
    setDeadlineValid(isValidDate(deadline));
  },[deadline])

  async function handleCreateTask(e : any){
    e.preventDefault();
    const newTask = await createTask({ title, description, deadline });
    console.log(newTask);
    setTitle('');
    setDescription('');
    setDeadline('');
  }

  return (
    <form 
      className="flex flex-col"
    >
      <h1>Create Task</h1>
      <label
        className="flex flex-row w-full m-2" 
      >
        Title
        <input
          type="text"
          className="flex-grow ml-2 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label
        className="flex flex-row w-full m-2" 
      >
        Description
        <textarea
          className="flex-grow ml-2 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label
        className="flex flex-row w-full m-2" 
      >
        Deadline
        <input
          type="text"
          className="flex-grow ml-2 rounded-md"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>

      <Button
        type="submit"
        disabled={!titleValid || !deadlineValid}
        className="w-full ml-2"
        onClick={handleCreateTask}
      >
        Create Task
      </Button>
    </form>
  )
}

export function ViewTasksComponent() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTasks(){
      const tasks = await listAllTasks();
      setTasks(tasks);
      setLoading(false);
    }
    getTasks();
  },[])

  async function getTasks(){
    setLoading(true);
    const tasks = await listAllTasks();
    setTasks(tasks);
    setLoading(false);
  }

  // if (tasks.length === 0) return <div>No tasks</div>
  if (loading) return <div>Loading Tasks...</div>
  return (
    <div>
      <h1>Tasks</h1>
      <Button
        type="button"
        onClick={getTasks}
      >
        Refresh
      </Button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {decodeTitle(task.id)} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  )
}