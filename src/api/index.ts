import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getAwsPreSignedUrl = async ({
  fileName,
  fileType,
}) => {
  const response = await axiosInstance.post('/getPreSignedUrl', {
    fileName,
    fileType,
  });

  return response.data;
}