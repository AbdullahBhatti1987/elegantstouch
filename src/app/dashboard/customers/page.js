"use client";

import AdminPageHeader from "@/components/admin/common/AdminPageHeader";
import { useState } from "react";

export default function CustomersPage() {
  const [view, setView] = useState("grid");

  return (
    <div>
      <AdminPageHeader
        title="Customers"
        description="Manage your store customers"
        searchPlaceholder="Search customers..."
        addText="Add Customer"
        view={view}
        setView={setView}
        onAdd={() => console.log("Add Customer")}
      />

      {view === "grid" ? <div>Grid Customers</div> : <div>List Customers</div>}
    </div>
  );
}
