'use client';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../hooks/useTasks';

export default function Home() {
  const { tasks, isLoaded, addTask, updateTask, deleteTask, addNoteToTask } = useTasks();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600 font-medium">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Task & Note Manager</h1>
          <p className="mt-2 text-sm text-gray-600">HNG Stage 1 Assignment</p>
        </header>
        
        <TaskForm onAddTask={addTask} />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Tasks</h2>
          <TaskList 
            tasks={tasks} 
            onUpdateTask={updateTask} 
            onDeleteTask={deleteTask} 
            onAddNote={addNoteToTask} 
          />
        </div>
      </div>
    </main>
  );
}
