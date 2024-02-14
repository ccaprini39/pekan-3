import { CreateTaskForm, ViewTasksComponent } from "./client components";
import { listAllTasks } from "./server-actions";

async function getTasks(){
  const tasks = await listAllTasks();
  return tasks;
}

export default async function TasksPage(){
  const tasks = await getTasks();
  return (
    <div
      className="w-screen h-screen max-h-screen p-5 max-w-screen"
    >
      <CreateTaskForm />
      <ViewTasksComponent />
    </div>
  )
}