import ImageKit from "imagekit";

const imageKit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC,
    privateKey: process.env.IMAGE_KIT_PRIVATE,
    urlEndpoint: process.env.IMAGE_KIT_URL,
});

export default imageKit