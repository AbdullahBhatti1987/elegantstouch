import { products } from "@/content/data";
import Link from "next/link";

export const metadata = {
  title: "New Arrivals | Baby Princess",
  description:
    "Explore the latest baby girl hair accessories, jewellery, clips, and gift sets recently added to our collection.",
};

export default function NewArrivalsPage() {
  //   const newArrivals = products.filter((product) => product.isNew);
  //   const newArrivals = products.filter((product) => product.bedge === "New Arrival");
  const newArrivals = products.filter((product) => {
    const created = new Date(product.createdAt);
    const today = new Date();

    return (today - created) / (1000 * 60 * 60 * 24) <= 30;
  });

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-pink-600 font-semibold uppercase">
            Fresh Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold">New Arrivals</h1>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Discover the latest additions to our collection of premium baby girl
            accessories.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-16">
        {newArrivals.length === 0 ? (
          <div className="text-center text-gray-500">
            No new arrivals available.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    New Arrival
                  </span>

                  <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>

                  <p className="text-sm text-gray-500">{product.category}</p>

                  <div className="mt-3 flex items-center gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-xl font-bold text-pink-600">
                          Rs {product.salePrice}
                        </span>

                        <span className="text-sm text-gray-400 line-through">
                          Rs {product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-pink-600">
                        Rs {product.price}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-5 block rounded-lg bg-pink-600 py-3 text-center font-medium text-white transition hover:bg-pink-700"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
