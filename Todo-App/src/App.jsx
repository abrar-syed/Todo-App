import { useEffect, useState } from "react"
import classes from "../src/style.module.css"
import TodoItem from "./components/todo-item"; 

function App() {

  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null)

  async function fetchListofTodos(){
    try{
      setLoading(true);
      const apiResponse = await fetch('https://dummyjson.com/todos');
      const result = await apiResponse.json();
      if(result.todos && result.todos.length>0){
        setTodoList(result.todos)
        setLoading(false)
        setErrorMsg('')
      }else{
        setTodoList([]);
        setLoading(false);
        setErrorMsg('')

      }
      
    }catch(err){
      console.log(err);
      setErrorMsg("Some error occured while fetching todos")
    }

  }


  useEffect(()=>{
    fetchListofTodos();
  },[])

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple Todo App Using Material UI</h1>
      <div>
        {
          todoList && todoList.length > 0
          ? todoList.map((todoItem) => <TodoItem todo={todoItem}/>)
          : null

        }
      </div>
    </div>
      
  )
}

export default App
