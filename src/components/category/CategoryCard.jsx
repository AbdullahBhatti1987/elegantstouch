import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ category }) {
  // console.log("category==>", category)
  const { _id, name, image } = category;
  // console.log("category Data==>", _id)
  // console.log("category Data==>", name)
  return (
    <Link
      href={`/categories/${category._id}`}
      // href={`/categories/${category.slug}`}
      className="group overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900"
    >
      {/* Image */}

      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={image?.thumbnail}
          alt={name}
          fill
          priority
          sizes="300px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Name */}

      <div className="border-t border-gray-100 p-3 text-center dark:border-zinc-800">
        <h3 className="line-clamp-1 text-sm font-semibold">{name}</h3>
      </div>
    </Link>
  );
}
