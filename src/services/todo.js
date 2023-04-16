import instance from '../lib/axios';

export const postTodo = async (data) => {
  return await instance.post('/todo-items', data);
};

export const putTodo = async (data, id) => {
  return await instance.patch(`/todo-items/${id}`, data);
};

export const deleteTodo = async (id) => {
  return await instance.delete(`/todo-items/${id}`);
};
