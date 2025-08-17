import { configDotenv } from 'dotenv';
import ImageKit from 'imagekit';
configDotenv();
const imageKit = new ImageKit({
  publicKey: process.env._IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env._IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env._IMAGEKIT_URL_ENDPOINT as string,
});
export default imageKit;
