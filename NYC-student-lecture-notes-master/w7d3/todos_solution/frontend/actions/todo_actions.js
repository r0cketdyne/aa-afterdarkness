import * as util from '../util/todo_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TODO_ERROR = "TODO_ERROR";


// async actions
export function requestTodos() {
  return (dispatch) => {
    return util.fetchTodos().then(todos => dispatch(receiveTodos(todos)));
  };
}

export function requestTodo(id) {
  return (dispatch) => {
    return util.fetchTodo(id).then(todo => dispatch(receiveTodo(todo)));
  };
}

export function createTodo(todo) {
  return (dispatch) => {
    return util.createTodo(todo)
      .then(todo => dispatch(receiveTodo(todo)),
            err => dispatch(receiveErrors(err.responseJSON)));
  };
}

export function updateTodo(todo) {
  return (dispatch) => {
    return util.updateTodo(todo).then(todo => dispatch(receiveTodo(todo)));
  };
}

export function destroyTodo(todo) {
  return (dispatch) => {
    return util.destroyTodo(todo).then(todo => dispatch(removeTodo(todo)));
  };
}


// sync actions
export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
});

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  todo
});

export const todoError = error => ({
  type: TODO_ERROR,
  error
});
