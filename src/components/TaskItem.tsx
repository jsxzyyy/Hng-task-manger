'use client';

import { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDeleteTask: (id: string) => void;
  onAddNote: (taskId: string, content: string) => void;
}

export default function TaskItem({ task, onUpdateTask, onDeleteTask, onAddNote }: TaskItemProps) {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleToggleComplete = () => {
    onUpdateTask(task.id, { isCompleted: !task.isCompleted });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    onAddNote(task.id, newNote.trim());
    setNewNote('');
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <div className={`p-4 mb-4 border rounded-lg shadow-sm transition-all ${task.isCompleted ? 'bg-gray-50 opacity-75' : 'bg-white'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={handleToggleComplete}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div>
            <h3 className={`text-lg font-medium ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1 text-sm">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                {task.category}
              </span>
              <span className={`px-2 py-0.5 rounded-full border ${priorityColors[task.priority]}`}>
                {task.priority} Priority
              </span>
              {task.dueDate && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 ml-4 flex-shrink-0">
          <button 
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            {isNotesOpen ? 'Hide Notes' : `Notes (${task.notes.length})`}
          </button>
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {isNotesOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 pl-8">
          {task.notes.length > 0 ? (
            <ul className="space-y-3 mb-4">
              {task.notes.map((note) => (
                <li key={note.id} className="bg-gray-50 p-3 rounded border border-gray-100 text-sm text-gray-700">
                  {note.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mb-4 italic">No notes attached yet.</p>
          )}
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Type a note..."
              className="flex-1 p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleAddNote}
              className="bg-gray-800 hover:bg-black text-white text-sm font-medium py-2 px-4 rounded transition duration-200"
            >
              Add Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
                  }
