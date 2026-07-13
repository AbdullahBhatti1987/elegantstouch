// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// import AdminCategoryGrid from '@/components/admin/categories/AdminCategoryGrid';
// import AdminCategoryTable from '@/components/admin/categories/AdminCategoryTable';
// import AdminPageHeader from '@/components/admin/common/AdminPageHeader';

// export default function CategoriesPage() {
//   const router = useRouter();
//   const [categories, setCategories] = useState([]);
//   const [view, setView] = useState('grid');
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState('');

//   // GET CATEGORIES
//   useEffect(() => {
//     async function getCategories() {
//       setLoading(true);
//       try {
//         const { data } = await axios.get('/api/categories');

//         if (data.success) {
//           setCategories(data.data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     }
//     setLoading(false);
//     getCategories();
//   }, []);

//   return (
//     <div>
//       <AdminPageHeader
//         title="Categories"

//         description="Manage your store categories"

//         searchPlaceholder="Search categories..."

//         addText="Add Category"

//         onChange={(value) => {
//           setSearch(value);
//           getCategories(value);
//         }}

//         view={view}

//         setView={setView}

//         onAdd={() => router.push('/dashboard/categories/add')}
//       />

//       {view === 'grid' ? (
//         <AdminCategoryGrid
//           categories={categories}
//           loading={loading}
//         />
//       ) : (
//         <AdminCategoryTable
//           categories={categories}
//           loading={loading}
//         />
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AdminCategoryGrid from '@/components/admin/categories/AdminCategoryGrid';
import AdminCategoryTable from '@/components/admin/categories/AdminCategoryTable';
import AdminPageHeader from '@/components/admin/common/AdminPageHeader';

export default function CategoriesPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('categoryView') || 'grid';
    }

    return 'grid';
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  // GET CATEGORIES
  const getCategories = async (keyword = '') => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/api/categories?search=${keyword}`,
      );

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
  localStorage.setItem('categoryView', view);
}, [view]);

  return (
    <div>
      <AdminPageHeader
        title="Categories"

        description="Manage your store categories"

        searchPlaceholder="Search categories..."

        search={search}

        onChange={(value) => setSearch(value)}

        onSearch={(value) => getCategories(value)}

        addText="Add Category"

        onAdd={() => router.push('/dashboard/categories/add')}

        view={view}

        setView={setView}
      />
      {view === 'grid' ? (
        <AdminCategoryGrid
          categories={categories}

          loading={loading}
        />
      ) : (
        <AdminCategoryTable
          categories={categories}

          loading={loading}
        />
      )}
    </div>
  );
}
