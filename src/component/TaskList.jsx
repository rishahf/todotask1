import React from 'react';

const TaskList = ({ tasks, onDeleteTask, onCompleteTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.title}>
          <div>
            <strong>{task.title}</strong> - {task.date} ({task.type})
          </div>
          <div>
            {!task.completed && (
              <>
                <button onClick={() => onDeleteTask(task.title)}>Delete</button>
                <button onClick={() => onCompleteTask(task.title)}>Complete</button>
              </>
            )}
            {task.completed && <span>Completed</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
