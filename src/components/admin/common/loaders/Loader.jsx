'use client';


// Grid Skeletons 
import BannerGridSkeleton from "../skeleton/gridSkeletons/BannerGridSkeleton";
import CartGridSkeleton from "../skeleton/gridSkeletons/CartGridSkeleton";
import CategoryGridSkeleton from "../skeleton/gridSkeletons/CategoryGridSkeleton";
import CouponGridSkeleton from "../skeleton/gridSkeletons/CouponGridSkeleton";
import OrderGridSkeleton from "../skeleton/gridSkeletons/OrderGridSkeleton";
import ProductGridSkeleton from "../skeleton/gridSkeletons/ProductGridSkeleton";

// Table Skeletons
import BannerTableSkeleton from "../skeleton/tableSkeletons/BannerTableSkeleton";
import CartTableSkeleton from "../skeleton/tableSkeletons/CartTableSkeleton";
import CategoryTableSkeleton from "../skeleton/tableSkeletons/CategoryTableSkeleton";
import CouponTableSkeleton from "../skeleton/tableSkeletons/CouponTableSkeleton";
import OrderTableSkeleton from "../skeleton/tableSkeletons/OrderTableSkeleton";
import ProductTableSkeleton from "../skeleton/tableSkeletons/ProductTableSkeleton";


const skeletons = {
  // ==================
  // Grid Skeletons
  // ==================

  categoryGrid: CategoryGridSkeleton,

  productGrid: ProductGridSkeleton,

  cartGrid: CartGridSkeleton,

  orderGrid: OrderGridSkeleton,

  couponGrid: CouponGridSkeleton,

  // customerGrid: AdminCustomerSkeleton,

  // wishlistGrid: WishlistGridSkeleton,

  bannerGrid: BannerGridSkeleton,

  // ==================
  // Table Skeletons
  // ==================

  categoryTable: CategoryTableSkeleton,

  productTable: ProductTableSkeleton,

  cartTable: CartTableSkeleton,

  orderTable: OrderTableSkeleton,

  couponTable: CouponTableSkeleton,

  // customerTable: CustomerTableSkeleton,

  // wishlistTable: WishlistTableSkeleton,

  bannerTable: BannerTableSkeleton,
};

export default function Loader({ type = 'categoryGrid', count = 8 }) {
  const SkeletonComponent = skeletons[type];

  if (!SkeletonComponent) {
    return null;
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </>
  );
}
