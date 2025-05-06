import mongoose from 'mongoose';

const imageSearchResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  searchImage: {
    type: String, // Cloudinary URL
    required: true
  },
  detectedLabels: [String],
  matchedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ImageSearchResult = mongoose.model('ImageSearchResult', imageSearchResultSchema);

export default ImageSearchResult;