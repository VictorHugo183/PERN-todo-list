# PERN todo list

## About:
A todo list application built with the PERN stack (PostgreSQL, Express, React, NodeJS).<br>
The frontend sends requests to the backend NodeJS API which then instructs the PostgreSQL database on which CRUD operation to perform based on the route requested and request method.<br>
It allows users to visualise all tasks, create new tasks, delete specific tasks and edit current tasks.
## Frontend:
Inside the client folder you will find the frontend section built with React.js and Bootstrap.<br>
### React Components (`client/src/components`): 
<ul>
<li><strong>ListTodos:</strong><br>
Responsible for rendering the table which contains a list of all the todo elements in our postgreSQL todo table.<br>
It fetches data by sending a GET request to our server API which queries our database and sends back the requested data. <br>
We loop through all the todo objects received to create table rows for each of them, each containing a description, edit and delete buttons.<br>
</li>
<li><strong>InputTodos:</strong><br>
Responsible for adding new elements into our database, which will be rendered by the ListTodos component.<br>
When we submit the form, we call a function which will send a POST request to the server API with the form's contents in the body (stored in the description state).<br>
the API will then take that request and insert its contents into the todo table in our database.
</li>
<li><strong>EditTodos:</strong><br>
Responsible for editing task descriptions, if is imported and used by the ListTodos component<br>
By clicking the Edit button, we're able to view the tasks description and alter it, doing so will update the description state with that value<br>
When we click apply, we call the function to send a PUT request to our server API with our new description in the body.<br>
The API will then tell the database to update the contents of the description column for that given todo, based on its id.

</li>
</ul>

## Backend:

### Server (`server/index.js`):
<ul>
  <li>Built with Node.js and Express.</li>
  <li>Contains routes which the frontend can use to make requests.</li>
  <li>For each route a query is made to the database to get/delete/update data.</li>
  <li>Allows us to manipulate the data on our database from the frontend application via HTTP requests.</li>
</ul>

### Database (`server/database.sql`):
<ul>
  <li>Built with PostgreSQL</li>
  <li>It contains a simple table with a id column (Primary Key) and a description column.</li>
  <li>The data inside is manipulated through CRUD operations via queries made by the server API based on HTTP requests from the frontend</li>
</ul>

## Running this project locally:
<ol>
  <li>
    What you'll need installed on your machine:
    <ul>
      <li>Node.js</li>
      <li>PostgreSQL</li>
    </ul>
  </li>
  <li>
    run <code>npm install</code> inside both <code>/client</code> and <code>/server</code> folders, to install dependencies.
  </li>
  <li>
    <h3>setting up the database:</h3>
    <ul>
      <li>
        run <code>psql -U postgres</code> on your terminal and input your password.
      </li>
      <li>
        type the commands inside the <code>/server/database.sql</code> file into your terminal to create the database.
      </li>
      <li>
        modify the contents of the <code>server/db.js</code> file to match your details. 
      </li>
    </ul>
  </li>
  <li>
    inside the <code>/server</code> directory run <code>node index.js</code> to start the server. You can also run <code>npm run develop</code> to run the server with nodemon, allowing for real time updates to the server.
  </li>
  <li>
    inside the <code>/client</code> directory run <code>npm start</code> to start the application.
  </li>
