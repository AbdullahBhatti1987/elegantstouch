import cloudinary from './cloudinary';

export async function singleFileToCloudinary(file, folder) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `elegantstouch/${folder}`,
          transformation: [
            {
              width: 800,
              height: 800,
              crop: 'limit',
              quality: 'auto',
              fetch_format: 'auto',
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      )
      .end(buffer);
  });

 return {
  url: result.secure_url,

  thumbnail: result.secure_url.replace(
    '/upload/',
    '/upload/w_300,h_300,c_fill,q_auto/'
  ),

  public_id: result.public_id,
};
}
