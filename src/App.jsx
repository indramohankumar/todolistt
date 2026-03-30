import { use, useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './contexts/todocontext'
import { Todoform, Todoitem } from './components'

function App() {
  const [todos, setTodos] = useState([])
  const addTodo=(todo)=>{
    setTodos((prev)=>[...prev,{id:Date.now(),todo,completed:false, timeSpent: 0}])
  }
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?{...prevTodo, todo}:prevTodo)))
  }
  const deleteTodo=(id)=>{
   setTodos((prev)=>prev.filter((each)=>each.id!==id))
  }
  function togglecomplete(id) {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
  }
  const updateTimeSpent=(id,timeSpent)=>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, timeSpent } : prevTodo)))
  }
  useEffect(()=>{
     const storedTodos=JSON.parse(localStorage.getItem("todos"))
     if(storedTodos && storedTodos.length>0){
      setTodos(storedTodos)
     }
},[])
useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
},[todos])
  return (
    <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,togglecomplete,updateTimeSpent}}>
      <div className='bg-[#172842] min-h-screen py-8'>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage your tools</h1>
          <div className='mb-4'>
            {/* todo form hoes here  */}
            <Todoform />
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {/* loop and todo list here */}
            {todos.map((todo)=><Todoitem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} togglecomplete={togglecomplete}/>)}

          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
