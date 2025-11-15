import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Task } from '@/hooks/useTasks';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  initialValues?: Partial<Task>;
  submitLabel: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues = {}, submitLabel }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [errors, setErrors] = useState({ title: '', description: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { title: '', description: '' };
    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        required
        multiline
      />
      <Button type="submit" variant="contained">{submitLabel}</Button>
    </Box>
  );
};

export default TaskForm;