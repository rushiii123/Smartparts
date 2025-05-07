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

    // Extract keywords using Vision API
    const { keywords, raw } = await analyzeImageAndExtractKeywords(imageUrl);
    console.log('Extracted keywords:', keywords);

    // Fetch all products (for custom filtering)
    const allProducts = await Product.find();

    // Filter products: at least 2 matching tags
    const matchingProducts = allProducts.filter((product) => {
      const matchCount = product.tags.filter(tag =>
        keywords.some(kw => new RegExp(kw, 'i').test(tag))
      ).length;

      return matchCount >= 2;
    });

    // Send response
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
