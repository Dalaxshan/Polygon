import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    saveTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    const updatedTasks = tasks.map(t => (t.id === id ? { ...t, ...updatedTask } : t));
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter(t => t.id !== id);
    saveTasks(filteredTasks);
  };

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTasks;