'use client';

import { useRef, useEffect, useState } from 'react';
import { UploadCloud, X, GripVertical, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { DndContext, closestCenter } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
function SortableImage({
  item,
  index,
  removeImage,
  setThumbnail,
  thumbnailId,
  loading,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
      disabled: loading,
    });

  // const [preview, setPreview] = useState(null);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // useEffect(() => {
  //   return () => {
  //     if (item.preview) {
  //       URL.revokeObjectURL(item.preview);
  //     }
  //   };
  // }, [item.preview]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative h-36 overflow-hidden rounded-xl border bg-white"
    >
      <img
        src={item.preview || item.url}
        alt="product"
        className="h-full w-full object-cover"
      />

      {/* Drag */}

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 rounded bg-white p-1 shadow"
      >
        <GripVertical size={16} />
      </button>

      {/* Thumbnail */}

      <button
        type="button"
        disabled={loading}
        onClick={() => setThumbnail(item.id)}
        className={`absolute bottom-2 left-2 flex items-center gap-1 rounded px-2 py-1 text-xs text-white ${
          thumbnailId === item.id ? 'bg-[#005b96]' : 'bg-black/70'
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <Star size={12} />

        {thumbnailId === item.id ? 'Thumbnail' : 'Set'}
      </button>

      {/* Remove */}

      {/* <button
        type="button"
        onClick={() => removeImage(item.id)}
        className="absolute top-2 right-2 rounded-full bg-black p-1 text-white opacity-100 transition md:opacity-0 md:group-hover:opacity-100"
      >
        <X size={14} />
      </button> */}
    </div>
  );
}

export default function MultiImageUpload({
  label = 'Product Images',
  value = [],
  onChange,
  thumbnailId,
  setThumbnail,
  loading = false,
}) {
  const inputRef = useRef(null);

  const addImages = (e) => {
    const files = [...e.target.files];

    const remaining = 5 - value.length;

    if (files.length > remaining) {
      toast.error('Maximum 5 images allowed');
    }

    const newImages = files
      .slice(0, remaining)
      .filter(
        (file) =>
          file.type.startsWith('image/') &&
          file.size <= 5 * 1024 * 1024,
      )
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

    onChange([...value, ...newImages]);

    e.target.value = '';
  };
  const removeImage = (id) => {
    const updated = value.filter((item) => item.id !== id);

    onChange(updated);

    if (thumbnailId === id) {
      setThumbnail(null);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = value.findIndex(
        (item) => item.id === active.id,
      );

      const newIndex = value.findIndex((item) => item.id === over.id);

      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <label className="mb-3 block font-medium">{label}</label>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={addImages}
        disabled={loading}
        className="hidden"
      />

      <div
        onClick={() => {
          if (!loading) {
            inputRef.current?.click();
          }
        }}
        className={`mb-5 flex h-52 items-center justify-center rounded-xl border-2 border-dashed bg-gray-50 ${
          loading
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer hover:border-black'
        }`}
      >
        <div className="text-center">
          <UploadCloud
            size={45}
            className="mx-auto mb-3 text-gray-400"
          />

          <p className="font-medium">
            {loading
              ? 'Uploading Images...'
              : 'Upload Product Images'}
          </p>

          <p className="text-sm text-gray-500">
            Maximum 5 images, 1MB each
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={loading ? undefined : handleDragEnd}
        >
          <SortableContext
            items={value.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {value.map((item, index) => (
                <SortableImage
                  key={item.id}
                  item={item}
                  index={index}
                  removeImage={removeImage}
                  setThumbnail={setThumbnail}
                  thumbnailId={thumbnailId}
                  loading={loading}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
