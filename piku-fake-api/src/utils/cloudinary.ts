import fs from 'fs';
import {
  UploadApiResponse,
  UploadApiOptions,
  v2 as cloudinary,
} from 'cloudinary';
import { Logger } from '@/utils/index.js';
import { InternalServerException } from '@/utils/index.js';
import { config as conf } from '@/config/index.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: conf.cloudinary.cloud_name,
  api_key: conf.cloudinary.api_key,
  api_secret: conf.cloudinary.api_secret,
});
class CloudinaryService {
  private removeLocalFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      Logger.info(`Temp file removes: ${filePath}`);
    }
  }

  async uploadImageOnCloudinary(
    localFilePath: string,
    uploadFolder: string,
    options?: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    if (!localFilePath) {
      Logger.warn('No local file path provided for image upload');
      throw new InternalServerException('No local file path provided');
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        folder: `images:${uploadFolder}`,
        resource_type: 'image',
        ...options,
      });

      this.removeLocalFile(localFilePath);
      Logger.info(`Image uploaded to cloudinary: ${uploadResult?.secure_url}`);
      return uploadResult;
    } catch (error) {
      this.removeLocalFile(localFilePath);
      Logger.error('Cloudinary file upload failed', error);
      throw new InternalServerException('Failed to upload file to Cloudinary');
    }
  }

  async uploadVideoOnCloudinary(
    localVideoPath: string,
    uploadFolder: string,
    options?: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    if (!localVideoPath) {
      Logger.warn('No local file path provided for video upload');
      throw new InternalServerException('No local file path provided');
    }

    try {
      const uploadResult = await cloudinary.uploader.upload(localVideoPath, {
        folder: `videos:${uploadFolder}`,
        resource_type: 'video',
        ...options,
      });

      this.removeLocalFile(localVideoPath);
      Logger.info(`Video uploaded to cloudinary: ${uploadResult?.secure_url}`);
      return uploadResult;
    } catch (error) {
      this.removeLocalFile(localVideoPath);
      Logger.error('Cloudinary video upload failed', error);
      throw new InternalServerException('Failed to upload video to Cloudinary');
    }
  }

  async deleteImageOnCloudinary(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
      });

      if (result.result !== 'ok') {
        Logger.warn(
          `Image deletion returned unexpected result: ${result.result}`,
        );
        return;
      }

      Logger.info(`Image deleted from cloudinary: ${publicId}`);
    } catch (error) {
      Logger.error(`Cloudinary image delete failed for ID: ${publicId}`, error);
      throw new InternalServerException(
        'Failed to delete image from Cloudinary',
      );
    }
  }

  async deleteVideoOnCloudinary(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'video',
      });

      if (result.result !== 'ok') {
        Logger.warn(
          `Video deletion returned unexpected result: ${result.result}`,
        );
        return;
      }

      Logger.info(`Video deleted from cloudinary: ${publicId}`);
    } catch (error) {
      Logger.error(`Cloudinary video delete failed for ID: ${publicId}`, error);
      throw new InternalServerException(
        'Failed to delete video from Cloudinary',
      );
    }
  }
}

const cloudinaryService = new CloudinaryService();

export default cloudinaryService;
