// 'use client';

// import { useEffect, useState } from 'react';

// import Image from 'next/image';
// import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import { ArrowLeft, Edit, Trash } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { Info } from '@/components/admin/common/form/Info';

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   async function getProduct() {
//     try {
//       const { data } = await axios.get(`/api/products/${params.id}`);
//       console.log('data=>', data);
//       if (data.success) {
//         setProduct(data.data);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || 'Product not found',
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function deleteProduct() {
//     const confirmDelete = confirm(
//       'Are you sure you want to delete this product?',
//     );

//     if (!confirmDelete) return;

//     try {
//       const { data } = await axios.delete(
//         `/api/products/${params.id}`,
//       );

//       if (data.success) {
//         toast.success('Product deleted');

//         router.push('/dashboard/products');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Delete failed');
//     }
//   }

//   useEffect(() => {
//     if (params.id) {
//       getProduct();
//     }
//   }, [params.id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!product) {
//     return <p>Product not found</p>;
//   }

//   return (
//   <div className="space-y-6">

//     {/* Header */}

//     <div className="flex items-center justify-between pt-4">

//       <div>
//         <h1 className="text-3xl font-bold">
//           {product.name}
//         </h1>

//         <p className="text-gray-500">
//           Product Details
//         </p>
//       </div>

//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
//       >
//         <ArrowLeft size={18}/>
//         Back
//       </button>

//     </div>

//     {/* Main Product section */}

//     <div className="grid gap-6 md:grid-cols-3">

//       {/* Gallery */}

//       <div className="rounded-xl border bg-white p-4 md:col-span-1">

//         <div className="grid grid-cols-5 gap-3">

//           {/* Main Image */}

//           <div className="relative col-span-4 h-[420px] overflow-hidden rounded-xl border">

//             <Image
//               src={
//                 product.images?.[selectedImage]?.url ||
//                 '/images/placeholder.jpg'
//               }
//               alt={product.name}
//               fill
//               priority
//               sizes="400px"
//               className="object-cover"
//             />

//           </div>

//           {/* Thumbnails */}

//           <div className="flex flex-col gap-3">

//             {product.images
//               ?.filter((_,index)=> index !== selectedImage)
//               .slice(0,4)
//               .map((img,index)=>{

//                 const realIndex =
//                   product.images.indexOf(img);

//                 return (

//                 <button
//                   key={img.public_id || index}
//                   onClick={() =>
//                     setSelectedImage(realIndex)
//                   }
//                   className="relative h-[78px] overflow-hidden rounded-lg border"
//                 >

//                   <Image
//                     src={img.thumbnail}
//                     alt={product.name}
//                     fill
//                     sizes="80px"
//                     className="object-cover"
//                   />

//                 </button>

//                 );

//               })}

//           </div>

//         </div>

//       </div>

//       {/* Information */}

//       <div className="space-y-6 rounded-xl border bg-white p-6 md:col-span-2">

//         {/* Basic */}

//         <section title="Basic Information">

//           <Info label="SKU" value={product.sku}/>

//           <Info label="Name" value={product.name}/>

//           <Info label="Slug" value={product.slug}/>

//           <Info
//             label="Category"
//             value={product.categoryId?.name}
//           />

//           <Info label="Brand" value={product.brand}/>

//           <Info
//             label="Collection"
//             value={product.collectionName}
//           />

//         </section>

//         {/* Pricing */}

//         <section title="Pricing & Stock">

//           <Info
//             label="Price"
//             value={`${product.price} ${product.currency}`}
//           />

//           <Info
//             label="Sale Price"
//             value={product.salePrice}
//           />

//           <Info
//             label="Stock"
//             value={product.stock}
//           />

//           <Info
//             label="Availability"
//             value={
//               product.inStock
//               ? "In Stock"
//               : "Out of Stock"
//             }
//           />

//         </section>

//         {/* Attributes */}

//         <section title="Product Attributes">

//           <Info label="Badge" value={product.badge}/>

//           <Info label="Material" value={product.material}/>

//           <Info label="Color" value={product.color}/>

//           <Info label="Age Group" value={product.ageGroup}/>

//           <Info label="Weight" value={product.weight}/>

//           <Info
//             label="Status"
//             value={product.status}
//           />

//           <Info
//             label="Featured"
//             value={
//               product.featured
//               ? "Yes"
//               : "No"
//             }
//           />

//         </section>

//       </div>

//     </div>

//     {/* Description */}

//     <div className="rounded-xl border bg-white p-6">

//       <h2 className="mb-4 text-xl font-semibold">
//         Description
//       </h2>

//       <Info
//         label="Short Description"
//         value={product.shortDescription}
//       />

//       <Info
//         label="Description"
//         value={product.description}
//       />

//       <Info
//         label="Features"
//         value={product.features}
//       />

//     </div>

//     {/* SEO */}

//     <div className="rounded-xl border bg-white p-6">

//       <h2 className="mb-4 text-xl font-semibold">
//         SEO Information
//       </h2>

//       <Info
//         label="SEO Title"
//         value={product.seoTitle}
//       />

//       <Info
//         label="SEO Description"
//         value={product.seoDescription}
//       />

//       <Info
//         label="Keywords"
//         value={product.keywords?.join(', ')}
//       />

//       <Info
//         label="Tags"
//         value={product.tags?.join(', ')}
//       />

//     </div>

//     {/* Actions */}

//     <div className="flex gap-3">

//       <button
//         onClick={() =>
//           router.push(
//           `/dashboard/products/${product._id}/edit`
//           )
//         }
//         className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
//       >

//         <Edit size={18}/>
//         Edit

//       </button>

//       <button
//         onClick={deleteProduct}
//         className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
//       >

//         <Trash size={18}/>
//         Delete

//       </button>

//     </div>

//   </div>
// );

// }

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Trash,
  Trash2,
  Package,
  Tag,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Info } from '@/components/admin/common/form/Info';
import ConfirmModal from '@/components/admin/common/ConfirmModal';
import ProductDetailSkeleton from '@/components/admin/common/skeleton/ProductDetailSkeleton';
import BackButton from '@/components/admin/common/header/BackButton';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function getProduct() {
    try {
      const { data } = await axios.get(`/api/products/${params.id}`);

      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Product not found',
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct() {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/api/products/${params.id}`,
      );

      if (data.success) {
        toast.success('Product deleted');

        router.push('/dashboard/products');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setLoading(false);

      setShowDeleteModal(false);
    }
  }

  useEffect(() => {
    if (params.id) {
      getProduct();
    }
  }, [params.id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500">Product Details</p>
        </div>

        <BackButton onClick={() => router.back()} />
      </div>

      {/* Main */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Gallery */}

        <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-900">
          <div className="space-y-4">
            {/* Main Image */}

            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-gray-100 sm:aspect-[4/3] lg:aspect-[5/4] dark:bg-zinc-800">
              <Image
                src={
                  product.images?.[selectedImage]?.url ||
                  '/images/placeholder.jpg'
                }
                alt={product.name}
                fill
                priority
                sizes="
          (max-width:640px) 100vw,
          (max-width:1024px) 50vw,
          500px
        "
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail Gallery */}

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
              {product.images
                ?.filter((_, index) => index !== selectedImage)
                .slice(0, 4)
                .map((img) => {
                  const index = product.images.indexOf(img);

                  return (
                    <button
                      key={img.public_id || index}
                      onClick={() => setSelectedImage(index)}
                      className="group relative aspect-square overflow-hidden rounded-xl border bg-gray-100 transition hover:ring-2 hover:ring-black dark:bg-zinc-800"
                    >
                      <Image
                        src={img.thumbnail || img.url}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        priority
                        sizes="
                  (max-width:640px) 25vw,
                  120px
                "
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Summary */}

        <div className="space-y-5 xl:col-span-2">
          <div className="relative space-y-4 rounded-xl border bg-white p-6 md:col-span-2 dark:bg-zinc-900">
            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {/* Edit */}
              <button
                onClick={() =>
                  router.push(`/dashboard/products/update/${id}`)
                }
                className="cursor-pointer rounded-lg bg-black p-2 text-white transition hover:bg-gray-800"
                title="Edit Category"
              >
                <Edit size={17} />
              </button>

              {/* Delete */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="cursor-pointer rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                title="Delete Category"
              >
                <Trash2 size={17} />
              </button>
            </div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Product Summary
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Info label="SKU" value={product.sku} />

              <Info
                label="Category"
                value={product.categoryId?.name}
              />

              <Info
                label="Price"
                value={`${product.price} ${product.currency}`}
              />

              <Info label="Stock" value={product.stock} />
            </div>
          </div>

          {/* Details */}

          <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">
              Product Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Info label="Slug" value={product.slug} />

              <Info label="Brand" value={product.brand} />

              <Info
                label="Collection"
                value={product.collectionName}
              />

              <Info label="Sale Price" value={product.salePrice} />

              <Info label="Material" value={product.material} />

              <Info label="Color" value={product.color} />

              <Info label="Age Group" value={product.ageGroup} />

              <Info label="Weight" value={product.weight} />

              <Info
                label="Featured"
                value={product.featured ? 'Yes' : 'No'}
              />

              <Info
                label="Availability"
                value={product.inStock ? 'In Stock' : 'Out Of Stock'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}

      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <h2 className="mb-5 text-xl font-semibold">Description</h2>

        <div className="space-y-4">
          <Info
            label="Short Description"
            value={product.shortDescription}
          />

          <Info label="Description" value={product.description} />

          <Info label="Features" value={product.features} />
        </div>
      </div>

      {/* SEO */}

      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <h2 className="mb-5 text-xl font-semibold">
          SEO Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <Info label="SEO Title" value={product.seoTitle} />

          <Info
            label="SEO Description"
            value={product.seoDescription}
          />

          <Info
            label="Keywords"
            value={product.keywords?.join(', ')}
          />

          <Info label="Tags" value={product.tags?.join(', ')} />
        </div>
      </div>
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Product"
        message="This product and related data will be permanently deleted."
        requireText={product.name}
        confirmText="Delete Product"
        loading={loading}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={deleteProduct}
      />
    </div>
  );
}
