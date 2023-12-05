import { useState } from 'react';
import { uploadImage } from './uploadImage';

export const useUploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageStatus, setImageStatus] = useState(null)

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const {image,status} = await uploadImage(file);
      setImageUrl(image);
      setImageStatus(status);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl,imageStatus, loading, error, uploadImage: handleUpload };
};