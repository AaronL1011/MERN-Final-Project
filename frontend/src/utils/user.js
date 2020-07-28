import axios from 'axios';

const apiUrl = 'https://grupgrup-backend.herokuapp.com/api';
// const apiUrl = 'http://localhost:3000/api';

export const getUserProfile = async (url, token) => {
  try {
    const response = await axios.get(apiUrl + `/users/profile/${url}`, {
      headers: {
        'auth-token': token
      }
    });
    console.log(response.status);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const submitProfileUpdate = async (
  token,
  config,
  profilePic,
  formData
) => {
  try {
    if (profilePic) {
      let profilePicFormData = new FormData();
      profilePicFormData.append('image', profilePic);
      await axios.post(apiUrl + `/profile-pic-upload`, profilePicFormData, {
        headers: config
      });
      console.log('Profile picture updated');
    }
    const response = await axios.put(apiUrl + `/users/update`, formData, {
      headers: {
        'auth-token': token
      }
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const handleChangePassword = async (bodyData, token) => {
  try {
    const response = await axios.put(
      apiUrl + `/users/update-password`,
      bodyData,
      {
        headers: {
          'auth-token': token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const deleteAccount = async (token) => {
  try {
    const response = await axios.delete(apiUrl + `/users/delete`, {
      headers: { 'auth-token': token }
    });

    localStorage.setItem('jwt', '');
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
