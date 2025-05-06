import { analyzeImage } from '../config/vision.js';
import Product from '../models/Product.js';

export const recognizeImage = async (req, res) => {
  try {
    let imageUrl;
    
    // Check if we have a URL provided directly
    if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } 
    // Check if we have an uploaded file from multer middleware
    else if (req.file && req.file.path) {
      imageUrl = req.file.path;
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'No image provided. Please upload an image or provide an image URL.' 
      });
    }
    
    // Analyze the image with Google Cloud Vision API
    const analysisResult = await analyzeImage(imageUrl);
    
    // Extract relevant keywords from analysis
    const keywords = [
      ...analysisResult.labels.map(label => label.description.toLowerCase()),
      ...analysisResult.text.toLowerCase().split(/\s+/),
      ...analysisResult.objects.map(obj => obj.name.toLowerCase())
    ].filter(kw => kw.trim() !== '');
    
    // Find products in MongoDB that match these keywords
    const matchingProducts = await Product.find({
      $or: [
        { name: { $regex: new RegExp(keywords.join('|'), 'i') } },
        { description: { $regex: new RegExp(keywords.join('|'), 'i') } },
        { category: { $regex: new RegExp(keywords.join('|'), 'i') } },
        { partNumber: { $in: keywords.map(kw => new RegExp(kw, 'i')) } }
      ]
    }).limit(20);
    
    res.status(200).json({
      success: true,
      keywords: keywords,
      imageUrl: imageUrl,
      products: matchingProducts
    });
    
  } catch (error) {
    console.error('Image recognition error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing image',
      error: error.message
    });
  }
};