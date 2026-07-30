'use client';

import { Edit, Trash2 } from 'lucide-react';

export default function ActionButtons({
  onEdit,
  onDelete,
  showEdit = true,
  showDelete = true,
}) {
  return (
    <div className="absolute z-50 top-4 right-4 flex gap-2">
      {/* Edit Button */}
      {showEdit && (
        <button
          onClick={onEdit}
          className="cursor-pointer rounded-lg bg-black p-2 text-white transition hover:bg-gray-800"
          title="Edit"
        >
          <Edit size={17} />
        </button>
      )}

      {/* Delete Button */}
      {showDelete && (
        <button
          onClick={onDelete}
          className="cursor-pointer rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
          title="Delete"
        >
          <Trash2 size={17} />
        </button>
      )}
    </div>
  );
}
