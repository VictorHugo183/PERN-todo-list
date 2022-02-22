import React, {useState} from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  /* edit description on edit click */
  const updateDescription = async(e) => {
    e.preventDefault();
    try {
      const bodyDesc = {description}
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyDesc)
      })
      /* refresh to see changes being done */
      window.location = "/";
      
    } catch (error) {
      console.error(error.message)
    }
  }
  return(
    <>
      {/* add onClick to set description to default on all closing buttons so that if no edits are made the modal displays the original descriptions. */}
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        Edit Task
      </button>
      {/* need a unique class for our modals so they display the correct descriptions */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit Task</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
            </div>

            <div className="modal-body">
              <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateDescription(e)}>Apply</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Cancel</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;