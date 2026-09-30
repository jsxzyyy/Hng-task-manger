export type Priority = 'High' | 'Medium' | 'Low';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: string;
  priority: Priority;
  dueDate: string | null;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}
 export default function useTasks() { return { tasks: [], isLoaded: true, addTask: () => {}, updateTask: () => {}, deleteTask: () => {}, addNoteToTask: () => {} }; }
