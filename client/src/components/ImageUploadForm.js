import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    setUploading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploading(false);
      setImageUrl(response.data.url);  // Assuming the response contains the image URL
      alert('Image uploaded successfully!');
    } catch (error) {
      setUploading(false);
      console.error(error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Upload an Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="block w-full px-4 py-2 border rounded-md shadow-sm"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg">Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" width="200" className="mt-2 rounded-md shadow-md" />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
