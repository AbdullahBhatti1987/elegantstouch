import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminCategoryCard({ category }) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/dashboard/categories/${category._id}`)
      }
      className="group overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow-md transition hover:shadow-xl"
    >
      <div className="relative h-52 w-full shadow-sm">
        {category?.image ? (
          <Image
            src={category.image}
            alt={category.alt || category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div>No Image</div>
        )}
      </div>

      <div className="flex flex-col justify-between p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {category.description}
        </p>

          {/* <div className="mt-3 text-sm">
            {category.productCount} Products
          </div> */}
      </div>
    </div>
  );
}
