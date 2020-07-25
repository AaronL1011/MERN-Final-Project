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

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data.error;
  }
};
