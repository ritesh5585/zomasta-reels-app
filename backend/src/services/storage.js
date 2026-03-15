import ImageKit from "imagekit";
import dotenv from "dotenv"

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
 
export async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName,
  });
  console.log("Uploaded from FS:", result.url);
    return result;
}

export async function uploadFromBuffer() {
  const result = await imagekit.upload({
    file: await toFile(Buffer.from("Hello World"), "hello.txt"),
    fileName: "hello.txt",
  });
  console.log("Uploaded from Buffer:", result.url);
}


