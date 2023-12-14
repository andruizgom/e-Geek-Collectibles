import { useState } from "react";
import { uploadImage } from "./uploadImage";

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const { image, status } = await uploadImage(file);
      return { image, status };
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadImage: handleUpload,
  };
};
