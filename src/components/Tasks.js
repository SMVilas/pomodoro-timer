import React, { useState, useEffect } from 'react';
import trashIcon from '../assets/images/trash.svg';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTask('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <section className="tasks">
      <div>
        <h1>Tarefas</h1>
        <form id="task-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="button" onClick={handleAddTask}>+</button>
        </form>
      </div>
      <div className="tasks-list">
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleDeleteTask(index)} className="delete-button">
                <img src={trashIcon} alt="Delete" />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Tasks;
