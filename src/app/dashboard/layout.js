import AdminLayout from "@/components/admin/common/header/AdminLayout";

export default function Layout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}