
import CategoriesFeatured from "@/components/home/CategoriesFeatured";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroCarousel from "@/components/home/HeroCarousel";
import { slides } from "@/content/data";

export default function Home() {
  return (
  <div>
    <HeroCarousel slides={slides} />
    {/* <CategoriesFeatured /> */}
    {/* <FeaturedProducts title="Trending Now" products={products} /> */}
  </div>
  );
}
