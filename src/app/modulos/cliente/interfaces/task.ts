export interface Task {
    name: string;
    completed: boolean;
    subtasks?: Task[];
  }