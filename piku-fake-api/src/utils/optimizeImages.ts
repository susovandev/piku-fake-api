import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { Logger } from '@/utils/index.js';

const optimizeImages = async (filePath: string): Promise<string> => {
  try {
    Logger.info('Optimizing image:', filePath);
    const outputPath = filePath.replace(path.extname(filePath), '.webp');
    await sharp(filePath)
      .resize({
        width: 1080,
        height: 1080,
        fit: 'contain',
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    await fs.unlink(filePath);

    Logger.info('Optimized image:', outputPath);
    return outputPath;
  } catch (error) {
    Logger.error('Error optimizing image:', error);
    throw new Error('Error optimizing image');
  }
};

export default optimizeImages;
