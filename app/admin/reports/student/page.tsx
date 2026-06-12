
"use client";

import { useEffect, useState } from "react";

interface Report {
  hall_ticket: string;
  name: string;
  present: number;
  total: number;
  percentage: number;
}

export default function StudentReport() {
  const [reports, setReports] = useState<Report[]>([]);

  async function loadReports() {
    const res = await fetch("/api/reports/student");
    const data = await res.json();
    setReports(data);
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="reports-page">
      <h1>📊 Student Attendance Report</h1>

      <br />
      <br />
      <div
  style={{
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  }}
>
  <a
    href="/api/reports/export"
    target="_blank"
  >
    <button className="btn btn-export">
      📥 Export CSV
    </button>
  </a>

  <button
    className="btn btn-print"
    onClick={() => window.print()}
  >
    🖨 Print Report
  </button>
</div>
<br />
<br />

      <table>
        <thead>
          <tr>
            <th>Hall Ticket</th>
            <th>Name</th>
            <th>Present</th>
            <th>Total</th>
            <th>Percentage</th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={5}>
                No Records Found
              </td>
            </tr>
          ) : (
            reports.map((item) => (
              <tr key={item.hall_ticket}>
                <td>{item.hall_ticket}</td>
                <td>{item.name}</td>
                <td>{item.present}</td>
                <td>{item.total}</td>
                <td>{item.percentage}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

