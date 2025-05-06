import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';

// Creates a client
const client = new ImageAnnotatorClient({
  // If you're using a key file:
  keyFilename: './config/smartparts-458017-c7d57b813224.json'
  // Or if using environment variables, it will use GOOGLE_APPLICATION_CREDENTIALS
});

export const analyzeImage = async (imageSource) => {
  try {
    let request;
    
    // Check if the image source is a URL or a local path
    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      // It's a URL
      request = {
        image: { source: { imageUri: imageSource } },
      };
    } else {
      // It's a local file or Cloudinary URL
      if (imageSource.includes('cloudinary.com')) {
        request = {
          image: { source: { imageUri: imageSource } },
        };
      } else {
        // It's a local file
        const imageContent = fs.readFileSync(imageSource);
        request = {
          image: { content: imageContent.toString('base64') },
        };
      }
    }
    
    // Performs label detection
    const [labelResult] = await client.labelDetection(request);
    const labels = labelResult.labelAnnotations || [];
    
    // Text detection
    const [textResult] = await client.textDetection(request);
    const detectedText = textResult?.textAnnotations?.[0]?.description || '';
    
    // Object localization
    const [objectResult] = await client.objectLocalization(request);
    const objects = objectResult?.localizedObjectAnnotations || [];
    
    return {
      labels: labels.map(label => ({ 
        description: label.description, 
        score: label.score 
      })),
      text: detectedText,
      objects: objects.map(object => ({
        name: object.name,
        score: object.score
      }))
    };
  } catch (error) {
    console.error('Vision API Error:', error);
    throw error;
  }
};