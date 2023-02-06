import axios from 'axios';
import { UserInfo } from 'climbingapp/src/store/slices/authInfo';
import { api } from 'climbingapp/src/utils/constants';

const userApi = api + '/users';
export const uploadProfileImage = async (formData: FormData) => {
  try {
    const { data } = await axios.post<string>(
      userApi + '/me/profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signUp = async (userInfo: UserInfo) => {
  await axios.post(api + '/auth/sign-up', userInfo);
};
