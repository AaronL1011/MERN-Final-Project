import axios from 'axios';

const apiUrl = 'https://grupgrup-backend.herokuapp.com/api';
// const apiUrl = 'http://localhost:3000/api';

export const createNewPost = async (formData, config) => {
  try {
    const response = await axios.post(apiUrl + `/image-upload`, formData, {
      headers: config
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(apiUrl + `/posts`);
    return response.data.reverse();
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const getUserPosts = async (id) => {
  try {
    const response = await axios.get(apiUrl + `/users/${id}/posts`);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
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

    return response;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
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
    console.log(error.response.data);
    return error.response.data;
  }
};
