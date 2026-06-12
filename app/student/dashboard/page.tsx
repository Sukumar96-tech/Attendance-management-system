
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [summary, setSummary] = useState({
    percentage: 0,
    todayStatus: "--",
  });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    const hall_ticket =
      localStorage.getItem("hall_ticket");

    if (!hall_ticket) return;

    const res = await fetch(
      `/api/student/dashboard?hall_ticket=${hall_ticket}`
    );

    const data = await res.json();

    setSummary({
      percentage: data.percentage,
      todayStatus: data.todayStatus,
    });
  }

  return (
    <div className="student-dashboard">

      <h1>🎓 Student Dashboard</h1>

      <br />

      <div className="student-card">

        <h2>Welcome Student</h2>

        <p>
          View your attendance and profile information.
        </p>

      </div>

      <br />

      <div className="student-grid">

        <Link href="/student/profile">
          <button className="btn">
            👤 Profile
          </button>
        </Link>

        <Link href="/student/history">
          <button className="btn">
            📜 Attendance History
          </button>
        </Link>

        <Link href="/student/settings">
          <button className="btn">
            ⚙️ Settings
          </button>
        </Link>

        <Link href="/login">
          <button className="btn">
            🚪 Logout
          </button>
        </Link>

      </div>

      <br />

      <div className="student-summary">

        <div className="summary-card">
          <h3>Attendance %</h3>
          <h1>{summary.percentage}%</h1>
        </div>

        <div className="summary-card">
          <h3>Today's Status</h3>
          <h1>{summary.todayStatus}</h1>
        </div>

      </div>

    </div>
  );
}

