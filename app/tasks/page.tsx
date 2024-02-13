import { CreateTaskForm, ViewTasksComponent } from "./client components";
import { listAllTasks } from "./server-actions";

export async function getTasks(){
  const tasks = await listAllTasks();
  return tasks;
}

export default async function TasksPage(){
  const tasks = await getTasks();
  return (
    <div
      className="w-screen h-screen max-h-screen p-5 max-w-screen"
    >
      {/* <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.id} - {task.description}
          </li>
        ))}
      </ul> */}
      <ViewTasksComponent />
      <CreateTaskForm />
    </div>
  )
}