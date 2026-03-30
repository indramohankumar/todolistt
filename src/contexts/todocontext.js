import { createContext,useContext } from "react";
export const Todocontext=createContext({
    todo:[
        {
            id:1,
            todo:"will complete my xyz application",
            completed:false,
            timeSpent:0,
        },
        
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    togglecomplete:(id)=>{},
    updateTimeSpent:(id,timeSpent)=>{}
})
export const useTodo=()=>{
    return useContext(Todocontext)
}
export const Todoprovider=Todocontext.Provider