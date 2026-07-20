import React from 'react';
import { ArrowLeft } from 'lucide-react';

function BackButton({onClick}) {
  return (
    <div className="flex gap-3">
      <button
    
        onClick={onClick}

        className="flex items-center gap-2 rounded-lg border px-4 py-2"
      >
        <ArrowLeft size={18} />
        Back
      </button>
    </div>
  );
}

export default BackButton;
