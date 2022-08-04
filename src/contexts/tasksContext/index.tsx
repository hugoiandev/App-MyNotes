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
  const [getTasksState, setGetTasksState] = useState<{
    loading: boolean;
    error: string | null;
    tasks: TaskType[];
  }>({ loading: false, error: null, tasks: [] });

  const [newTaskState, setNewTaskState] = useState<{
    loading: boolean;
    error: string | null;
  }>({ loading: false, error: null });

  const [updateTaskState, setUpdateTaskState] = useState<{
    loading: boolean;
  }>({ loading: false });

  const getTasks = useCallback(async () => {
    setGetTasksState({ ...getTasksState, loading: true });
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

      setGetTasksState({ ...getTasksState, loading: false, tasks: data });
    } catch (err) {
      const { response } = err as AxiosError;
      const { message } = response?.data as { message: string };
      setGetTasksState({ ...getTasksState, loading: false, error: message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newTask = useCallback(
    async (task: { name: string; description: string }) => {
      setNewTaskState({ ...newTaskState, loading: true });
      try {
        await api.post('/task', task);
        setNewTaskState({ ...newTaskState, loading: false });
        getTasks();
      } catch (err) {
        setNewTaskState({ ...newTaskState, loading: false });
        Alert.alert('Erro', 'Ocorreu um erro ao tentar criar tarefa', [
          {
            text: 'Ok',
          },
        ]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const updateStatusTask = useCallback(async (taskId: string) => {
    try {
      await api.patch(`/task/${taskId}`);
      getTasks();
    } catch (err) {
      Alert.alert('Ocorreu um erro', 'Ocorreu um erro ao atualizar a taréfa.', [
        { text: 'Ok' },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await api.delete(`/task/${taskId}`);
      Alert.alert('Sucesso', 'Sua tarefa foi deletada.', [
        {
          text: 'Ok',
        },
      ]);
      getTasks();
    } catch (err) {
      Alert.alert('Ocorreu um erro', 'Ocorreu um erro ao deletar a taréfa.', [
        {
          text: 'Ok',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTask = useCallback(
    async (taskId: string, task: { name: string; description: string }) => {
      setUpdateTaskState({ ...updateTaskState, loading: true });
      try {
        await api.put(`task/${taskId}`, task);
        setUpdateTaskState({ ...updateTaskState, loading: false });
        Alert.alert('Sucesso', 'Tarefa atualizada.', [
          {
            text: 'Ok',
          },
        ]);
        getTasks();
      } catch (err) {
        const { response } = err as AxiosError;
        const { message } = response?.data as { message: string };
        setUpdateTaskState({ ...updateTaskState, loading: false });
        Alert.alert('Ocorreu um erro', message, [
          {
            text: 'Ok',
          },
        ]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const value = useMemo(() => {
    return {
      getTasks,
      getTasksState,
      updateStatusTask,
      deleteTask,
      updateTask,
      updateTaskState,
      newTask,
      newTaskState,
    };
  }, [
    getTasks,
    getTasksState,
    updateStatusTask,
    deleteTask,
    updateTask,
    updateTaskState,
    newTask,
    newTaskState,
  ]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
