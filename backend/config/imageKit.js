import ImageKit, { toFile } from '@imagekit/nodejs';
import fs from 'fs';

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// to upload image
export const uploadToImageKit = async (fileInput, fileName) => {
  try {
    let file;

    // Handle Buffer (from Multer memory storage) using ImageKit's toFile helper
    if (Buffer.isBuffer(fileInput)) {
      file = await toFile(fileInput, fileName);
    }
    // Handle Base64 / Data URI strings
    else if (typeof fileInput === 'string' && fileInput.startsWith('data:')) {
      file = fileInput;
    }
    // Handle local file path strings
    else if (typeof fileInput === 'string') {
      if (!fs.existsSync(fileInput)) {
        throw new Error(`File path does not exist: ${fileInput}`);
      }
      file = fs.createReadStream(fileInput);
    } else {
      throw new Error('Invalid file input type provided.');
    }

    return await imageKit.files.upload({
      file: file,
      fileName: fileName,
      folder: '/employee_profiles',
    });
  } catch (e) {
    throw new Error(`ImageKit upload failed: ${e.message}`);
  }
};

// to delete an image (renamed to match controller call: deleteFromImageKit)
export const deleteFromImageKit = async (url) => {
  try {
    if (!url || typeof url !== 'string' || !url.includes('imagekit.io')) {
      return null;
    }

    const fileName = url.substring(url.lastIndexOf('/') + 1);

    if (!fileName) return null;

    const files = await imageKit.assets.list({
      searchQuery: `name = "${fileName}"`,
    });

    if (files && files.length > 0) {
      const fileId = files[0].fileId;
      const deleteResult = await imageKit.files.delete(fileId);
      return deleteResult;
    }

    return null;
  } catch (e) {
    throw new Error(`Imagekit deletion failed: ${e.message}`);
  }
};

export default ImageKit;
