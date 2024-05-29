export enum TaskState {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Task {
  id: string;
  name: string;
  state: TaskState;
  priority: TaskPriority;
  startDate: string;
  endDate: string;
}
