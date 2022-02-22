const express = require("express")
const cors = require("cors");
const app = express();
/* with pool we can run queries with postgres */
const pool = require("./db");

/* Middlewares */
app.use(cors());
/* allows us to gain access to request.body containing client-side data */
app.use(express.json());

/* API Routes */

/* create a todo */
app.post("/todos", async (req,res) => {
  try {
    /* destructure the request to get its content */
    const {description} = req.body;
    /* use pool to insert new todo into the description column with a variable value specified in the next argument. */
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
    /* RETURNING * returns the values of our rows. which we can use to see our responses more clearly. */
    res.json(newTodo.rows[0]);

  } catch (error) {
    console.error(error.message)
  }
})

/* get all Todos */
app.get("/todos", async (req,res) => {
  try {
    /* we don't have to say RETURN * here because select already returns our data */
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);

  } catch (error) {
    console.error(error.message)
  }
})

/* get one specific todo */
/* /todos/:id allows our url to be dynamic, if we went to todos/random our req.params would be { id: 'random } */
app.get("/todos/:id", async (req,res) =>{
  try {
    const {id} = req.params;
    /* select a todo where the todo_id value matches the request params */
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);

  } catch (error) {
    console.error(error.message);
  }
})

/* update a specific Todo */
app.put("/todos/:id", async (req,res) => {
  try {
    const {id} = req.params; /* id from url */
    const {description} = req.body; /* description from request body */
    /* update todo table, set the description column equal to the description from request body where the todo_id matches the request params.*/
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    res.json("Todo was updated.");

  } catch (error) {
    console.error(error.message);
  }
})

/* Delete a todo */
app.delete("/todos/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted");

  } catch (error) {
    console.error(error.message);
  }
})


app.listen(5000, () =>{
  console.log("server has started on port 5000")
})