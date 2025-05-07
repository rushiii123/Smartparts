import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';

// Vision client setup
const client = new ImageAnnotatorClient({
  keyFilename: './config/smartparts-vision-cb24444eff3a.json',
});

export const analyzeImageAndExtractKeywords = async (imageSource) => {
  try {
    const image = imageSource.startsWith('http')
      ? { source: { imageUri: imageSource } }
      : { content: fs.readFileSync(imageSource).toString('base64') };

    const [result] = await client.annotateImage({
      image,
      features: [
        { type: 'LABEL_DETECTION' },
        { type: 'TEXT_DETECTION' },
        { type: 'OBJECT_LOCALIZATION' },
      ],
    });

    const labels = result.labelAnnotations || [];
    const text = result.textAnnotations?.[0]?.description || '';
    const objects = result.localizedObjectAnnotations || [];

    // 🧠 Extract raw keyword phrases
    const labelPhrases = labels.map(l => l.description.toLowerCase());
    const objectPhrases = objects.map(o => o.name.toLowerCase());
    const textWords = text.toLowerCase().split(/\s+/);

    // 🔁 Explode compound phrases into single keywords
    const exploded = [
      ...labelPhrases.flatMap(p => p.split(/\s+/)),
      ...objectPhrases.flatMap(p => p.split(/\s+/)),
      ...textWords
    ].filter(Boolean);

    // 🚫 Remove duplicates
    const uniqueKeywords = [...new Set(exploded)];

    return {
      keywords: uniqueKeywords,
      raw: {
        labels,
        text,
        objects,
      },
    };
  } catch (error) {
    console.error('Vision API Error:', error);
    throw error;
  }
};
