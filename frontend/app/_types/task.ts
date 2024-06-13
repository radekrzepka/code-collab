export enum TaskStatus {
  TODO,
  IN_PROGRESS,
  DONE,
}

export interface Task {
  id: number;
  name: string;
  assignee: string;
  dueDate: string;
  status: number;
}
