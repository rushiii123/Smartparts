import { analyzeImageAndExtractKeywords } from '../config/vision.js';
import Product from '../models/Product.js';

export const recognizeImage = async (req, res) => {

  try {
    const imageUrl = req.file?.path || req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'No image provided. Please upload an image or provide an image URL.',
      });
    }

    const { keywords, raw } = await analyzeImageAndExtractKeywords(imageUrl);
    console.log('Extracted keywords:', keywords);

    const matchingProducts = await Product.find({
      $or: [
        // { name: { $regex: new RegExp(keywords.join('|'), 'i') } },
        // { description: { $regex: new RegExp(keywords.join('|'), 'i') } },
        // { category: { $regex: new RegExp(keywords.join('|'), 'i') } },
        // { partNumber: { $in: keywords.map(kw => new RegExp(kw, 'i')) } },
        { tags: { $in: keywords.map(kw => new RegExp(kw, 'i')) } } 

      ]
    }).limit(20);

    res.status(200).json({
      success: true,
      keywords,
      imageUrl,
      products: matchingProducts,
    });

  } catch (error) {
    console.error('Image recognition error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing image',
      error: error.message,
    });
  }
};
