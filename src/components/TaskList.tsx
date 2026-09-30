'use client';

import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDeleteTask: (id: string) => void;
  onAddNote: (taskId: string, content: string) => void;
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask, onAddNote }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">No tasks found. Get started by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onAddNote={onAddNote}
        />
      ))}
    </div>
  );
}
