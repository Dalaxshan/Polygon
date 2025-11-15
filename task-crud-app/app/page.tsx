'use client';

import { Container, Typography, Box } from '@mui/material';
import useTasks from '@/hooks/useTasks';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Home() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Task Manager</Typography>
      <TaskForm onSubmit={addTask} submitLabel="Add Task" />
      <Box sx={{ mt: 4 }}>
        <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
      </Box>
    </Container>
  );
}