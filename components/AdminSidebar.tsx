"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    {
      name: "🏠 Dashboard",
      link: "/admin/dashboard",
    },
    {
      name: "👨‍🎓 Students",
      link: "/admin/students",
    },
    {
      name: "✅ Attendance",
      link: "/admin/attendance",
    },
    {
      name: "📜 History",
      link: "/admin/history",
    },
    {
      name: "📊 Reports",
      link: "/admin/reports",
    },
    {
      name: "⚙️ Settings",
      link: "/admin/settings",
    },
  ];

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    localStorage.clear();
    window.location.replace("/login");
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <h2>🎓 College ERP</h2>

        <ul>
          {menu.map((item) => (
            <li
              key={item.link}
              className={
                pathname === item.link
                  ? "active-menu"
                  : ""
              }
            >
              <Link
                href={item.link}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </aside>
    </>
  );
}
