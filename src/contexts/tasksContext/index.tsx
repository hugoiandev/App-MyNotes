import { AxiosError } from 'axios';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import api from '../../services/api';
import TasksContextTypes, { TaskType } from './types';
import { Alert } from 'react-native';

export const TasksContext = createContext({} as TasksContextTypes);

interface TaskProviderProps {
  children: ReactNode;
}

const TasksProvider = ({ children }: TaskProviderProps) => {
  const [tasksState, setTasksState] = useState<{
    loading: boolean;
    error: string | null;
    tasks: TaskType[];
  }>({ loading: false, error: null, tasks: [] });

  const getTasks = useCallback(async () => {
    setTasksState({ ...tasksState, loading: true });
    try {
      const { data } = await api.get<
        {
          _id: string;
          name: string;
          description: string;
          finished: boolean;
          userId: string;
        }[]
      >('/task');

      setTasksState({ ...tasksState, loading: false, tasks: data });
    } catch (err) {
      const { response } = err as AxiosError;
      const { message } = response?.data as { message: string };
      setTasksState({ ...tasksState, loading: false, error: message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatusTask = useCallback(async (taskId: string) => {
    try {
      await api.patch(`/task/${taskId}`);
      getTasks();
    } catch (err) {
      Alert.alert('Ocorreu um erro', 'Ocorreu um erro ao atualizar a taréfa.', [
        { text: 'Ok' }
      ]);
    }
  }, []);

  const value = useMemo(() => {
    return {
      getTasks,
      tasksState,
      updateStatusTask
    };
  }, [getTasks, tasksState, updateStatusTask]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
