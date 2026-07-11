
import CategoriesFeatured from "@/components/home/CategoriesFeatured";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroCarousel from "@/components/home/HeroCarousel";
import { categories, products, slides } from "@/content/data";

export default function Home() {
  return (
  <div>
    <HeroCarousel slides={slides} />
    <CategoriesFeatured data={categories} />
    <FeaturedProducts title="Trending Now" products={products} />
  </div>
  );
}
