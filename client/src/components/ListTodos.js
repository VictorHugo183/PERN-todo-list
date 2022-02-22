import React, {useEffect, useState} from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

  const [todos, setTodos] = useState([]);

  /* delete todo function */
  const deleteTodo = async(id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      /* make sure the list refreshes when item is deleted, by returning all todo items except if they have the id of the deleted item*/
      setTodos(todos.filter(item => item.todo_id !== id))
    } catch (error) {
      console.error(error.message)
    }
  }

  /* fetch all todos and add them to the todos state */
  const getTodos = async() => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      /* sorting by id everytime lets us preserve the order of tasks when a task is edited. */
      const sortedList = jsonData.sort((a,b) => (a.todo_id > b.todo_id) ? 1 : -1)
      setTodos(sortedList);
      
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

  return(
  <>
  <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.todo_id}>
          {console.log(todo)}
          <td>{todo.description}</td>
          <td><EditTodo todo={todo}/></td>
          <td><button className="btn btn-danger" onClick={()=> deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
  </>
  );
}

export default ListTodos;