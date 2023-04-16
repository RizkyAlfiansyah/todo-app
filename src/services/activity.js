import instance from '../lib/axios';

export const getActivity = async (params) => {
  return await instance.get('/activity-groups', { params });
};

export const getActivityById = async (id) => {
  return await instance.get(`/activity-groups/${id}`);
};

export const postActivity = async (data) => {
  return await instance.post('/activity-groups', data);
};

export const putActivity = async (data, id) => {
  return await instance.patch(`/activity-groups/${id}`, data);
};

export const deleteActivity = async (id) => {
  return await instance.delete(`/activity-groups/${id}`);
};
