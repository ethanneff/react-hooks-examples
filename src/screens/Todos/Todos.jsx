import React, { useContext, useReducer, useEffect, useState } from "react";
import { TodosContext, todosReducer } from ".";
import { TodoList } from "./TodoList";
import axios from "axios";
import { List } from "react-content-loader";

const useAPI = ({ url, method = "get", data = {}, timeout = 2000 }) => {
  const [request, setRequest] = useState({
    loading: false,
    data: undefined,
    error: undefined
  });

  const getData = async () => {
    setRequest({ data: undefined, loading: true, error: undefined });
    try {
      const response = await axios({ url, method, data, timeout });
      setRequest({ data: response.data, loading: false, error: undefined });
    } catch (error) {
      setRequest({ data: undefined, loading: false, error: error.message });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { ...request, retry: () => getData() };
};

export const Todos = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const response = useAPI({
    url: "https://json-server-now.ethanneff.now.sh/todos"
  });
  const handleRetry = () => response.retry();

  useEffect(() => {
    if (response.data) {
      dispatch({
        type: "GET_TODOS",
        payload: response.data
      });
    }
  }, [response.data]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {response.loading ? (
        <List />
      ) : response.error ? (
        <>
          <div>
            {response.error}
            <button onClick={handleRetry}>retry</button>
          </div>
        </>
      ) : (
        <TodoList />
      )}
    </TodosContext.Provider>
  );
};
