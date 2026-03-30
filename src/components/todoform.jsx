import React from 'react' 
import { useTodo } from '../contexts/todocontext'

function Todoform() {
    const [todo,settodo]=React.useState("")
    const {addTodo}=useTodo()
    const add=(e)=>{
      e.preventDefault()
      if(!todo) return
      addTodo(todo)
      settodo("")
    }
  return (
    <form className='flex' onSubmit={add}>
        <input
        type='text'
        placeholder='write todo...'
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150
        bg-white/20 py-1.5'
        value={todo}
        onChange={(e)=>settodo(e.target.value)}
        />
        <button type='submit' className='rounded-lg px-3 bg-green-600 text-white/20 py-1.5'>
        Add
        </button>
      
    </form>
  )
}

export default Todoform
