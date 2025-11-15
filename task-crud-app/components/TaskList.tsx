import { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '@/hooks/useTasks';
import TaskForm from './TaskForm';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditSubmit = (updated: Omit<Task, 'id'>) => {
    if (editingTask) {
      onUpdate(editingTask.id, updated);
      setEditingTask(null);
    }
  };

  return (
    <List>
      {tasks.map(task => (
        <ListItem key={task.id} divider>
          {editingTask?.id === task.id ? (
            <TaskForm onSubmit={handleEditSubmit} initialValues={task} submitLabel="Update" />
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <ListItemText primary={task.title} secondary={task.description} />
              <IconButton onClick={() => setEditingTask(task)}><EditIcon /></IconButton>
              <IconButton onClick={() => onDelete(task.id)}><DeleteIcon /></IconButton>
            </Box>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;