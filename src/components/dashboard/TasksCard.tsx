'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiClock, FiCheckCircle, FiPlus } from 'react-icons/fi';

type Task = {
  id: number;
  task: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
};

type TasksCardProps = {
  initialTasks?: Task[];
};

export default function TasksCard({ initialTasks = [] }: TasksCardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    
    const newTask: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      task: newTaskText,
      due: 'Tomorrow',
      priority: 'medium',
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Upcoming Tasks
        </h3>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="group">
              <div className="relative flex items-start py-3 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id={`task-${task.id}`}
                    name={`task-${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <label 
                    htmlFor={`task-${task.id}`} 
                    className={`text-sm font-medium ${
                      task.completed 
                        ? 'text-gray-400 dark:text-gray-500 line-through' 
                        : 'text-gray-900 dark:text-white'
                    } cursor-pointer`}
                  >
                    {task.task}
                  </label>
                  <div className="flex items-center mt-1">
                    <FiClock className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 mr-1" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {task.due}
                    </p>
                    
                    {/* Priority indicator */}
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${task.priority === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                        : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center"
                  >
                    <span className="sr-only">Complete</span>
                    <FiCheckCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {/* Quick add task */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <form className="flex" onSubmit={addNewTask}>
            <div className="flex-1 min-w-0 mr-3">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlus className="h-4 w-4 mr-1" /> Add
            </button>
          </form>
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
        <div className="text-sm">
          <Link href="/dashboard/tasks" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
            View all tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
