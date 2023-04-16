import instance from '../lib/axios';

export const getActivity = async (params) => {
  return await instance.get('/activity-groups', { params });
};

export const postActivity = async (data) => {
  return await instance.post('/activity-groups', data);
};

export const putActivity = async (data) => {
  return await instance.put('/activity-groups', data);
};

export const deleteActivity = async (id) => {
  return await instance.delete(`/activity-groups/${id}`);
};
