"use client"


import CategoriesFeatured from "@/components/home/CategoriesFeatured";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FlashSale from "@/components/home/FlashSale";
import HeroCarousel from "@/components/home/HeroCarousel";
import HeroCarouselWithCanvas from "@/components/home/HeroCarouselWithCanvas";

export default function Home() {
  return (
  <div className="flex flex-col ">
    <HeroCarousel  />
    {/* <HeroCarouselWithCanvas  /> */}
    <CategoriesFeatured />

     <FlashSale />
    {/* <FeaturedProducts title="Trending Now" products={products} /> */}
  </div>
 );
}
