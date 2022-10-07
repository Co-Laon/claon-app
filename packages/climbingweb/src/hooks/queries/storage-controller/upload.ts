import makeMasterTokenInstance from '../../mocks/makeMasterTokenInstance';

/**
 * http://claon.life:8080/swagger-ui/index.html#/storage-controller/uploadUsingPOST
 * @param image
 * @returns
 */
export const upload = async (image: string) => {
  const axiosInstance = makeMasterTokenInstance();
  const form = new FormData();
  form.append('image', image);
  return axiosInstance.post('/image/profile', form);
};
