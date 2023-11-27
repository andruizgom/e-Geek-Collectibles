import { useState } from 'react';
import { uploadImage } from './uploadImage';

export const useUploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (image) => {
    try {
      setLoading(true);
      const url = await uploadImage(image);
      console.log("url",url);
      setImageUrl(url);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl, loading, error, uploadImage: handleUpload };
};