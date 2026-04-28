
import { apiClient } from "../../../shared/services/apiClient";


export const getProfile = async () => {
  try {
    const res = await apiClient.get('/auth/user-get',{
        headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout:15000
   } );
    return res;
  } catch (error: any) {
    console.error("getProfile error:", error.response?.data || error.message);
    return null;
  }
};

type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string; 
  createdAt: string; 
  __v: number;
};
type UpdateUserResponse = {
  success: boolean;
  message: string;
  user: UserType | null;
  status?: number;
};

export const updateUser = async (
  name: string,
  image?: string
): Promise<UpdateUserResponse> => {
  try {
    

    const formData = new FormData();

    formData.append('name', name.trim());

    if (image) {
      const fileName = image.split('/').pop() || 'profile.jpg';
  const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

      formData.append('image', {
        uri: image,
        type: fileType,
        name: fileName,
      } as any);
    }
    const res = await apiClient.put(`/auth/update-user`, formData, {
      timeout: 15000,
    });

   return {
  status: res.status,
  success: true,
  message: res.data?.message || 'Profile updated successfully',
  user: res.data?.user || res.data?.data || null,
};
  } catch (error: any) {
    console.error('Update error data:', error?.response?.data);
    console.error('Update error status:', error?.response?.status);
    console.error('Update error message:', error?.message);

    return {
  status: error?.response?.status,
  success: false,
  message:
    error?.response?.data?.message ||
    error?.message ||
    'Failed to update profile',
  user: null,
};
  }
};  