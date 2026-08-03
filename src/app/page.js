'use client';

import CategoriesFeatured from '@/components/home/CategoriesFeatured';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FlashSale from '@/components/home/FlashSale';
import HeroCarousel from '@/components/home/HeroCarousel';
import HeroCarouselNew from '@/components/home/HeroCarouselNew';
import HeroCarouselWithCanvas from '@/components/home/HeroCarouselWithCanvas';
import ProductImageSlider from '@/components/home/ProductImageSlider';
import Testimonials from '@/components/home/Testimonials';
import { heroSlides } from '@/content/data';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      {/* <HeroCarouselWithCanvas /> */}
      {/* <HeroCarouselNew slides={heroSlides} autoPlayInterval={6000} /> */}
      <CategoriesFeatured />
      <ProductImageSlider />
      <Testimonials />
      <FlashSale />
      {/* <FeaturedProducts title="Trending Now" products={products} /> */}
    </div>
  );
}
