"use client";
import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
import ProductGrid from "@/components/admin/products/ProductGrid";
import ProductTable from "@/components/admin/products/ProductTable";
import { products } from "@/content/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductsPage() {
  const [view, setView] = useState("grid");
  const router = useRouter();

  const onEdit = (category) => {
    console.log("Edit Product:", category);
  };

  const onDelete = (id) => {
    console.log("Delete Product:", id);
  };


  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage your store products"
        searchPlaceholder="Search products..."
        addText="Add Product"
        view={view}
        setView={setView}
        onAdd={() => router.push("/dashboard/products/add")}
      />
      {view === "grid" ?
      <ProductGrid products={products} onEdit={onEdit} onDelete={onDelete} />
      :
      <ProductTable products={products} onEdit={onEdit} onDelete={onDelete} />}
      
    </div>
  );
}
