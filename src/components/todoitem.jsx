import React, { useState, useEffect } from 'react'
import { useTodo } from '../contexts/todocontext'

function Todoitem({ todo }) {
  const { updateTodo, deleteTodo, togglecomplete, updateTimeSpent } = useTodo()
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(todo.timeSpent || 0)
  const [isTodoEditing, setIsTodoEditing] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)

  const editTodo = () => {
    updateTodo(todo.id, todoMsg)
    setIsTodoEditing(false)
  }

  const toggleCompleted = () => {
    if (isRunning) {
      setIsRunning(false);
      updateTimeSpent(todo.id, elapsedTime);
    }
    togglecomplete(todo.id)
  }

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      updateTimeSpent(todo.id, elapsedTime);
    } else {
      setIsRunning(true);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type='checkbox'
        className='cursor-pointer'
        checked={todo.completed}
        onChange={toggleCompleted}
      />  
      <input
        type='text'
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditing ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditing}
      />
      <div className="flex items-center gap-2 bg-white/50 px-2 rounded-lg shrink-0 border border-black/10">
        <span className="font-mono text-sm w-11 text-center font-semibold text-gray-700">{formatTime(elapsedTime)}</span>
        <button
          className="inline-flex w-6 h-6 rounded text-xs justify-center items-center hover:bg-white/50 transition-colors disabled:opacity-50"
          onClick={toggleTimer}
          disabled={todo.completed}
          title={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? "⏸️" : "▶️"}
        </button>
      </div>
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditing) {
            editTodo();
          } else {
            setIsTodoEditing((prev) => !prev);
          }
        }}
        disabled={todo.completed}   
      >
        {isTodoEditing ? "📁" : "✏️"}
      </button>
      <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default Todoitem
