import imageKit from '../config/imagekit.config';

const imageUploadService = async (file: Express.Multer.File) => {
  const uploadResponse = await imageKit.upload({
    file: file.buffer,
    fileName: `${Date.now().toLocaleString()}-${file.originalname}`,
    useUniqueFileName: true,
  });
  return uploadResponse.url;
};
export default imageUploadService;
