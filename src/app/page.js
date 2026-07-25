"use client"


import CategoriesFeatured from "@/components/home/CategoriesFeatured";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function Home() {
  return (
  <div>
    <HeroCarousel  />
    <CategoriesFeatured />
    {/* <FeaturedProducts title="Trending Now" products={products} /> */}
  </div>
 );
}
