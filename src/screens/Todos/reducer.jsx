export const todosReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "TOGGLE_TODO":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        todos: [
          ...state.todos.map(todo =>
            todo.id === action.payload.id ? action.payload : todo
          )
        ]
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.payload.id)]
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: [
          ...state.todos.map(todo =>
            todo.id === state.currentTodo.id ? action.payload : todo
          )
        ],
        currentTodo: {}
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    default:
      return state;
  }
};
