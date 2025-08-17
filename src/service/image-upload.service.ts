import imageKit from '../config/imagekit.config.js';

const imageUploadService = async (file, productId?) => {
  const uploadResponse = await imageKit.upload({
    file: file.buffer,
    fileName: `${productId}-${Date.now()}-${file.originalname}`,
    useUniqueFileName: true,
  });
  return uploadResponse.url;
};
export default imageUploadService;
