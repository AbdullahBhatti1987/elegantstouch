import cloudinary from './cloudinary';

export async function bannerFileToCloudinary(file, folder) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `elegantstouch/${folder}`,

          transformation: [
            {
              width: 1600,
              height: 600,
              crop: 'fill',
              gravity: 'center',
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
      '/upload/w_800,h_300,c_fill,q_auto/',
    ),

    public_id: result.public_id,
  };
}
