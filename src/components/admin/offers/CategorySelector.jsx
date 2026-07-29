'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategorySelector({
  selectedCategories,
  setSelectedCategories,
  activeCategory,
  setActiveCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const { data } = await axios.get('/api/categories');

      if (data.success) {
        setCategories(data.data);
      }
    }

    getCategories();
  }, []);

  const toggleCategory = (id) => {
    // product panel change

    setActiveCategory(id);

    // category selection maintain

    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== id),
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {categories.map((category) => (
        <button
          key={category._id}

          type="button"

          onClick={() => toggleCategory(category._id)}

          className={`rounded-xl border p-3 transition ${
            activeCategory === category._id
              ? 'border-blue-500 bg-blue-50 text-blue-600'
              : selectedCategories.includes(category._id)
                ? 'bg-gray-100'
                : ''
          } `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
