'use client';

import { useRef } from 'react';
import { UploadCloud, X, GripVertical } from 'lucide-react';

import { DndContext, closestCenter } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

function SortableImage({ file, index, removeImage }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative h-32 overflow-hidden rounded-xl border"
    >
      <img
        src={URL.createObjectURL(file)}
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

      {/* Remove */}

      <button
        type="button"
        onClick={() => removeImage(index)}
        className="absolute top-2 right-2 rounded-full bg-black p-1 text-white opacity-0 transition group-hover:opacity-100"
      >
        <X size={14} />
      </button>

      {index === 0 && (
        <span className="absolute bottom-2 left-2 rounded bg-black px-2 py-1 text-xs text-white">
          Main
        </span>
      )}
    </div>
  );
}

export default function MultiImageUpload({
  label,
  value = [],
  onChange,
}) {
  const inputRef = useRef(null);

  const addImages = (e) => {
    const files = [...value, ...Array.from(e.target.files)];

    onChange(files);
  };

  const removeImage = (index) => {
    const updated = value.filter((_, i) => i !== index);

    onChange(updated);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const updated = arrayMove(value, active.id, over.id);

      onChange(updated);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-3 block font-medium">{label}</label>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={addImages}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current.click()}
        className="mb-5 flex h-52 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed bg-gray-50 hover:border-black"
      >
        <div className="text-center">
          <UploadCloud
            size={45}
            className="mx-auto mb-3 text-gray-400"
          />

          <p className="font-medium">Upload Product Images</p>

          <p className="text-sm text-gray-500">
            Select multiple images
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={value.map((_, index) => index)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {value.map((file, index) => (
                <SortableImage
                  key={index}

                  file={file}

                  index={index}

                  removeImage={removeImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
