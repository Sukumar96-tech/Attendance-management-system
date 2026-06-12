import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="admin-container">

      <AdminSidebar />

      <div className="main-content">

        <AdminTopbar />

        <main>{children}</main>

      </div>

    </div>
  );
}