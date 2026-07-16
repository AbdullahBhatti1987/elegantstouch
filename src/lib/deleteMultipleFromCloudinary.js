export async function deleteMultipleFromCloudinary(images) {
  if (!images?.length) return;

  await Promise.all(
    images.map((image) =>
      cloudinary.uploader.destroy(image.public_id),
    ),
  );
}
