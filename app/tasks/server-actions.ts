'use server'
import { Tasks, getXataClient } from "@/src/xata";
import { encodeTitle } from "./utils";

function createUUID() : string {
  const uuid = crypto.randomUUID();
  return uuid;
}

export async function listAllTasks() {
  const xata = getXataClient();
  const tasks  = await xata.db.Tasks.select([
    "id",
    "description",
  ]).getAll();
  return tasks as Tasks[];
}

export async function createTask(task: CreateTaskRequest) {
  const xata = getXataClient();
  const id = createUUID();
  const titleAndId = encodeTitle(task.title);
  const description = task.description ? task.description : "blah";
  const deadline = task.deadline ? task.deadline : "12Jun2042";
  const newTask = {
    id : titleAndId,
    description,
    status: "open",
    deadline,
  }
  await xata.db.Tasks.create(newTask);
  return newTask;
}


