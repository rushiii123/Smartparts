import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // 👈 must match multer upload.single('image')

    setUploading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/search/analyze-upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setUploading(false);
      setResults(response.data); // full response with keywords + products
    } catch (error) {
      setUploading(false);
      console.error(error);
      alert('Error processing image');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Search by Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="block w-full px-4 py-2 border rounded-md shadow-sm"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-contain rounded-md border"
          />
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          disabled={uploading}
        >
          {uploading ? 'Processing...' : 'Search Products'}
        </button>
      </form>

      {results && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Keywords:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {results.keywords.map((kw, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {kw}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2">Matched Products:</h3>
          {results.products.length === 0 ? (
            <p className="text-sm text-gray-500">No matching products found.</p>
          ) : (
            <ul className="space-y-2">
              {results.products.map((prod, idx) => (
                <li key={idx} className="p-3 bg-gray-50 rounded shadow">
                  <strong>{prod.name || 'Unnamed Product'}</strong>
                  <p>{prod.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
