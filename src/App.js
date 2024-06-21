import React, { useState, useEffect } from 'react';
import TaskList from './component/TaskList';
import TaskForm from './component/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState('all'); 

  const addTask = (newTask) => {
    if (tasks.some(task => task.title === newTask.title)) {
      alert('Task with the same title already exists!');
      return;
    }
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (title) => {
    setTasks(tasks.filter(task => task.title !== title));
  };

  const completeTask = (title) => {
    setTasks(tasks.map(task => 
      task.title === title ? { ...task, completed: true } : task
    ));
  };

  // Function to filter tasks based on type
  const filteredTasks = () => {
    if (filter === 'weekly') {
      return tasks.filter(task => task.type === 'weekly');
    } else if (filter === 'monthly') {
      return tasks.filter(task => task.type === 'monthly');
    } else {
      return tasks;
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={filteredTasks()} 
        onDeleteTask={deleteTask} 
        onCompleteTask={completeTask} 
      />
 =     <div>
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('weekly')}>Weekly Tasks</button>
        <button onClick={() => setFilter('monthly')}>Monthly Tasks</button>
      </div>
    </div>
  );
};

export default App;
