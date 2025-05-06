// components/home/Hero.jsx
import { useState } from 'react';
import { Camera, Search, Upload, Link as LinkIcon } from 'lucide-react';
import SearchBar from '../shared/SearchBar';
import ImageUpload from '../shared/ImageUpload';
import { useSearch } from '../../context/SearchContext';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const { searchMethod, setSearchMethod, searchImage, setSearchImage } = useSearch();
  const [activeTab, setActiveTab] = useState(searchMethod);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchMethod(tab);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchMethod === 'image') {
      setIsProcessing(true);
      
      try {
        let response;
        
        if (uploadMethod === 'file' && searchImage) {
          // Handle file upload
          const formData = new FormData();
          formData.append('image', searchImage);
          
          response = await fetch('http://localhost:5000/api/recognize/analyze-upload', {
            method: 'POST',
            body: formData,
          });
        } else if (uploadMethod === 'url' && imageUrl) {
          // Handle image URL
          response = await fetch('http://localhost:5000/api/recognize/analyze-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
          });
        } else {
          throw new Error('No image provided');
        }

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        console.log('Recognition response:', data);
        
        // Navigate to search results with the recognized data
        navigate('/search', { state: { recognitionData: data } });
      } catch (error) {
        console.error('Error during recognition:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')" 
        }}
      />
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Find Spare Parts Fast – 
            <span className="text-orange-400 block mt-2">Snap it or Search it!</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 animate-fade-in-delay">
            Connect with suppliers instantly and get exactly what you need.
          </p>
          
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`flex items-center px-4 py-3 font-medium border-b-2 transition-colors -mb-px text-gray-800 ${
                  activeTab === 'text'
                    ? 'border-blue-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => handleTabChange('text')}
              >
                <Search size={20} className="mr-2" />
                <span>Text Search</span>
              </button>
              <button
                className={`flex items-center px-4 py-3 font-medium border-b-2 transition-colors -mb-px text-gray-800 ${
                  activeTab === 'image'
                    ? 'border-blue-600'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => handleTabChange('image')}
              >
                <Camera size={20} className="mr-2" />
                <span>Image Search</span>
              </button>
            </div>
            
            <div className="transition-all duration-300">
              {activeTab === 'text' ? (
                <div className="animate-fade-in">
                  <SearchBar variant="large" showButton={true} />
                </div>
              ) : (
                <div className="animate-fade-in">
                  {/* Image search method selection */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      className={`flex items-center justify-center px-4 py-2 rounded-md flex-1 transition-colors ${
                        uploadMethod === 'file'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setUploadMethod('file')}
                    >
                      <Upload size={18} className="mr-2" />
                      <span>Upload Image</span>
                    </button>
                    <button
                      className={`flex items-center justify-center px-4 py-2 rounded-md flex-1 transition-colors ${
                        uploadMethod === 'url'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setUploadMethod('url')}
                    >
                      <LinkIcon size={18} className="mr-2" />
                      <span>Image URL</span>
                    </button>
                  </div>
                  
                  {uploadMethod === 'file' ? (
                    <ImageUpload />
                  ) : (
                    <div className="mb-6">
                      <div className="relative rounded-md">
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          placeholder="Paste image URL here..."
                          value={imageUrl}
                          onChange={handleImageUrlChange}
                        />
                        {imageUrl && (
                          <div className="mt-4 p-2 border border-gray-200 rounded-md">
                            <img 
                              src={imageUrl} 
                              alt="Image preview" 
                              className="max-h-48 mx-auto rounded-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {(searchImage || imageUrl) && (
                    <div className="mt-4 flex justify-center">
                      <Button 
                        onClick={handleSearchSubmit}
                        disabled={isProcessing}
                        className={isProcessing ? 'opacity-70 cursor-not-allowed' : ''}
                      >
                        {isProcessing ? 'Processing...' : 'Search with this Image'}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}