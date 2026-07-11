"use client";

import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";


export default function ProductCard({
  product,
  onEdit,
  onDelete,
}) {

  return (

    <div
      className="
      border
      rounded-xl
      overflow-hidden
      bg-white
      dark:bg-gray-900
      "
    >


      {/* Image */}

      <div className="relative h-40">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />

      </div>



      {/* Content */}

      <div className="p-4">


        <div className="flex justify-between">

          <h3 className="
          font-semibold
          truncate
          ">
            {product.name}
          </h3>


          {
            product.badge &&
            <span className="
            text-xs
            bg-yellow-100
            px-2 py-1
            rounded
            ">
              {product.badge}
            </span>
          }


        </div>



        <p className="text-sm text-gray-500 mt-2">
          {product.category}
        </p>



        <div className="mt-3">

          <span className="font-bold">
            {product.salePrice || product.price}
          </span>

          <span className="ml-1 text-sm">
            {product.currency}
          </span>

        </div>



        <div className="text-sm mt-2">

          Stock:
          <b className="ml-1">
            {product.stock}
          </b>

        </div>




        <div className="flex gap-2 mt-4">


          <button
            onClick={()=>onEdit(product)}
            className="
            flex-1
            border
            rounded-lg
            py-2
            flex
            justify-center
            gap-2
            "
          >

            <Edit size={16}/>
            Edit

          </button>



          <button
            onClick={()=>onDelete(product.id)}
            className="
            flex-1
            bg-red-500
            text-white
            rounded-lg
            py-2
            flex
            justify-center
            gap-2
            "
          >

            <Trash2 size={16}/>
            Delete

          </button>


        </div>


      </div>


    </div>

  );
}