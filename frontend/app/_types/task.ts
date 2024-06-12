export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export interface Task {
  id: number;
  name: string;
  assignee: string;
  dueDate: string;
  status: TaskStatus;
}
