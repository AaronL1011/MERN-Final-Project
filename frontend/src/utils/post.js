import axios from 'axios';

export const createNewPost = async (formData, config) => {
  try {
    const response = await axios.post(
      'http://grupgrup-backend.herokuapp.com/image-upload',
      formData,
      {
        headers: config
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data.error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(
      'http://grupgrup-backend.herokuapp.com/api/posts'
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
