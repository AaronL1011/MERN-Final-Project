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

    return response.data.reverse();
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
  const config = {
    headers: {
      'auth-token': token
    }
  };
  try {
    const response = await axios.delete(apiUrl + `/posts/${id}`, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updatePost = async (id, token, data) => {
  const config = {
    headers: {
      'auth-token': token
    }
  };
  try {
    const response = await axios.put(apiUrl + `/posts/${id}`, data, config);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
