type TaskType = {
  _id: string;
  name: string;
  description: string;
  finished: boolean;
  userId: string;
};

interface TasksContextTypes {
  getTasks: () => Promise<void>;
  tasksState: { loading: boolean; error: string | null; tasks: TaskType[] };
  updateStatusTask: (taskId: string) => Promise<void>;
}

export type { TaskType };

export default TasksContextTypes;
