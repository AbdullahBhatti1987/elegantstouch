import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminCategoryCard({ category }) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/dashboard/categories/${category._id}`)
      }
      className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg"
    >
      <div className="relative h-52 w-full">
        {category?.image ? (
          <Image
            src={category.image}
            alt={category.alt || category.name}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div>No Image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>

        <p className="mt-2 text-sm text-gray-500">
          {category.description}
        </p>

        <div className="mt-3 text-sm">
          {category.productCount} Products
        </div>
      </div>
    </div>
  );
}
