import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon } from 'lucide-react';
import {jwtDecode} from 'jwt-decode';
import Button from '../../components/shared/Button';

export default function VendorAddProductPage() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    partNumber: '',
    category: '',
    condition: 'New',
    price: '',
    quantity: '',
    description: '',
    specifications: '',
    compatibility: '',
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // START loading
  
    const token = localStorage.getItem('token');
    let vendorId = '';
    if (token) {
      try {
        const decoded = jwtDecode(token);
        vendorId = decoded?.userId || decoded?._id || '';
      } catch (err) {
        console.error('Invalid token', err);
        setLoading(false); // STOP loading
        return;
      }
    }
  
    const form = new FormData();
    form.append('name', formData.name);
    form.append('partNumber', formData.partNumber);
    form.append('category', formData.category);
    form.append('condition', formData.condition);
    form.append('price', formData.price);
    form.append('quantity', formData.quantity);
    form.append('description', formData.description);
    form.append('specifications', formData.specifications);
    form.append('compatibility', formData.compatibility);
    form.append('vendorId', vendorId);
  
    images.forEach((file) => {
      form.append('images', file);
    });
  
    try {
      const res = await fetch('http://localhost:5000/api/products/vendor', {
        method: 'POST',
        body: form,
      });
  
      const data = await res.json();
      setLoading(false); // STOP loading
  
      if (res.ok) {
        navigate('/vendor/listings');
      } else {
        console.error('Upload failed:', data.message);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setLoading(false); // STOP loading
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                  <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.name} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700 mb-1">Part Number*</label>
                    <input type="text" id="partNumber" name="partNumber" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.partNumber} onChange={handleChange} />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select id="category" name="category" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.category} onChange={handleChange}>
                      <option value="">Select a category</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Tools">Tools</option>
                      <option value="Machinery">Machinery</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition*</label>
                    <select id="condition" name="condition" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.condition} onChange={handleChange}>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Refurbished">Refurbished</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                    <input type="number" id="price" name="price" required min="0" step="0.01" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.price} onChange={handleChange} />
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                    <input type="number" id="quantity" name="quantity" required min="0" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.quantity} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {images.length < 4 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} multiple />
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Image</span>
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">Upload up to 4 images. First image will be the main product image.</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea id="description" name="description" rows={4} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.description} onChange={handleChange} />
                </div>

                <div>
                  <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                  <textarea id="specifications" name="specifications" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.specifications} onChange={handleChange} placeholder="Enter product specifications (e.g., dimensions, material, etc.)" />
                </div>

                <div>
                  <label htmlFor="compatibility" className="block text-sm font-medium text-gray-700 mb-1">Compatibility</label>
                  <textarea id="compatibility" name="compatibility" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={formData.compatibility} onChange={handleChange} placeholder="List compatible models or applications" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/vendor/listings')} disabled={loading}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
