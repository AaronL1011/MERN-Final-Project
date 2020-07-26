import axios from 'axios';

const apiUrl = 'https://grupgrup-backend.herokuapp.com/api';

export const createNewPost = async (formData, config) => {
  try {
    const response = await axios.post(apiUrl + `/image-upload`, formData, {
      headers: config
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(apiUrl + `/posts`);

    return response.data;
  } catch (error) {
    console.log(error.res);
    return error;
  }
};

export const getUserPosts = async (id) => {
  try {
    const response = await axios.get(apiUrl + `/users/${id}/posts`);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deletePost = async (id, token) => {
  const data = {
    headers: {
      'auth-token': token
    }
  };
  try {
    const response = await axios.delete(apiUrl + `/posts/${id}`, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
