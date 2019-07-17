import React, { useContext, useState, useRef, useEffect } from "react";
import { TodosContext } from ".";
import axios from "axios";

export const TodoList = () => {
  const addTodoTextRef = useRef();
  const [addTodoText, setAddTodoText] = useState("");
  const {
    state: { todos, currentTodo },
    dispatch
  } = useContext(TodosContext);
  const title = todos.length > 0 ? `${todos.length} items` : `Nothing to do`;

  const handleSubmit = async e => {
    e.preventDefault();
    if (currentTodo.text) {
      const todo = { id: Date.now(), text: addTodoText, complete: false };
      const response = await axios.patch(
        `https://json-server-now.ethanneff.now.sh/todos/${currentTodo.id}`,
        { text: addTodoText }
      );
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const todo = { id: Date.now(), text: addTodoText, complete: false };
      const response = await axios.post(
        "https://json-server-now.ethanneff.now.sh/todos",
        todo
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setAddTodoText("");
    addTodoTextRef.current.focus();
  };

  useEffect(() => {
    if (currentTodo.text) {
      setAddTodoText(currentTodo.text);
      addTodoTextRef.current.focus();
    }
  }, [currentTodo]);

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ userSelect: "none" }}>
            <button
              onClick={async () => {
                await axios.delete(
                  `https://json-server-now.ethanneff.now.sh/todos/${todo.id}`
                );
                dispatch({ type: "REMOVE_TODO", payload: todo });
              }}
            >
              <img src="https://icon.now.sh/delete/8b0000" alt="delete icon" />
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img src="https://icon.now.sh/edit/0050c5" alt="edit icon" />
            </button>
            <span
              style={{
                textDecoration: todo.complete ? "line-through" : undefined
              }}
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `https://json-server-now.ethanneff.now.sh/todos/${todo.id}`,
                  { complete: !todo.complete }
                );
                dispatch({ type: "TOGGLE_TODO", payload: response.data });
              }}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          ref={addTodoTextRef}
          type="text"
          placeholder="add a todo..."
          value={addTodoText}
          onChange={e => setAddTodoText(e.target.value)}
        />
        <button type="submits">Submit</button>
      </form>
    </div>
  );
};
