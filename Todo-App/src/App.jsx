import { useEffect, useState } from "react"
import classes from "../src/style.module.css"
import TodoItem from "./components/todo-item"; 
import TodoDetails from "./components/todo-details";
import { Skeleton } from "@mui/material";

function App() {

  const [loading, setLoading] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null)
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
      
    }
    catch(err){
      console.log(err);
      setErrorMsg("Some error occured while fetching todos")
    }

  }

  async function fetchDetailsOfCurrentTodo(currentTodoId){
    
    // console.log(currentTodoId);
    
    try{

      const apiResponse = await fetch (`https://dummyjson.com/todos/${currentTodoId}`)
      const details = await apiResponse.json();
      console.log(details);
      
      if(details){
        setTodoDetails(details);
        setOpenDialog(true)
      }
      else{
        setTodoDetails(null);
        setOpenDialog(false);
      }
    }catch (err){
      console.log(err);
      
    }
  }

  useEffect(()=>{
    fetchListofTodos();
  },[])

  if(loading) return <Skeleton variant="rectangular" width={650} height={650}/>

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>Simple Todo App Using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList.length > 0
          ? todoList.map((todoItem) => <TodoItem fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo} todo={todoItem}/>)
          : null

        }
      </div>
      <TodoDetails 
      openDialog={openDialog} 
      todoDetails={todoDetails}
      setOpenDialog={setOpenDialog}
      setTodoDetails={setTodoDetails}
      />
    </div>
      
  )
}

export default App
