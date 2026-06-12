"use client";

import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export default function Reports() {
  return (
    <div className="reports-page">

      <h1>📊 Reports Dashboard</h1>

      <br />

      <div className="reports-grid">

        <Link href="/admin/reports/student">
          <button className="btn">
            👨‍🎓 Student Report
          </button>
        </Link>

        <Link href="/admin/reports/daily">
          <button className="btn">
            📅 Daily Report
          </button>
        </Link>

        <Link href="/admin/reports/monthly">
          <button className="btn">
            📆 Monthly Report
          </button>
        </Link>

        <Link href="/admin/reports/yearwise">
          <button className="btn">
            🎓 Year-wise Report
          </button>
        </Link>
        
      </div>

    </div>
  );
}