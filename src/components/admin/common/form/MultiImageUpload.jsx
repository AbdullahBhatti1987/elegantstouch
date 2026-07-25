'use client';

import { useRef } from 'react';
import { UploadCloud, GripVertical, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DndContext, closestCenter } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

function SortableImage({ item, loading, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
      disabled: loading,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative overflow-hidden rounded-xl border bg-white"
    >
      <Image
        src={item.preview || item.url}
        alt="product"
        width={300}
        height={300}
        className="aspect-square w-full rounded-lg object-cover"
      />

      {/* Drag Button */}

      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={loading}
        className="absolute top-2 left-2 rounded bg-white p-1 shadow disabled:opacity-50"
      >
        <GripVertical size={16} />
      </button>

      {/* Remove Button */}

      <button
        type="button"
        disabled={loading}
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default function MultiImageUpload({
  label = 'Product Images',
  value = [],
  onChange,
  loading = false,
}) {
  const inputRef = useRef(null);

  const addImages = (e) => {
    const files = [...e.target.files];

    const remaining = 5 - value.length;

    if (remaining <= 0) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    if (files.length > remaining) {
      toast.error(`Only ${remaining} images can be added`);
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

  const removeImage = (id) => {
    const image = value.find((item) => item.id === id);

    // New uploaded image ka blob URL cleanup
    if (image?.preview && image.file) {
      URL.revokeObjectURL(image.preview);
    }

    const updatedImages = value.filter((item) => item.id !== id);

    onChange(updatedImages);
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

      {/* Upload Box */}

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
            {loading ? 'Uploading Images...' : 'Add Product Images'}
          </p>

          <p className="text-sm text-gray-500">Maximum 5 images</p>
        </div>
      </div>

      {/* Images */}

      {value.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={loading ? undefined : handleDragEnd}
        >
          <SortableContext
            items={value.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {value.map((item) => (
                <SortableImage
                  key={item.id}
                  item={item}
                  loading={loading}
                  onRemove={removeImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
