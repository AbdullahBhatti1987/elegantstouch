import cloudinary from './cloudinary';

export async function deleteFromCloudinary(public_id) {
  if (!public_id) return;

  await cloudinary.uploader.destroy(public_id);
}
