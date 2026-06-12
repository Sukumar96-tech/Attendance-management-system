"use client";

import Link from "next/link";

export default function QuickActions() {

  return (

    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="action-grid">

        <Link href="/admin/students">
          <button>
            ➕ Add Student
          </button>
        </Link>

        <Link href="/admin/attendance">
          <button>
            ✅ Take Attendance
          </button>
        </Link>

        <Link href="/admin/history">
          <button>
            📜 History
          </button>
        </Link>

        <Link href="/admin/reports">
          <button>
            📊 Reports
          </button>
        </Link>

      </div>

    </div>

  );

} 