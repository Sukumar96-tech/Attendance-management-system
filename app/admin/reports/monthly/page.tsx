"use client";

import { useState } from "react";

interface Report {
  hall_ticket: string;
  name: string;
  present: number;
  absent: number;
}

export default function MonthlyReport() {
  const [month, setMonth] = useState("");
  const [reports, setReports] = useState<Report[]>([]);

  async function loadReport() {
    if (!month) {
      alert("Please select a month");
      return;
    }

    const res = await fetch(
      `/api/reports/monthly?month=${month}`
    );

    const data = await res.json();

    setReports(data);
  }

  return (
    <div className="reports-page">

      <h1>📆 Monthly Attendance Report</h1>

      <br />

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <button
        className="btn"
        onClick={loadReport}
      >
        Load Report
      </button>

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
            <th>Absent</th>

          </tr>

        </thead>

        <tbody>

          {reports.length === 0 ? (

            <tr>

              <td colSpan={4}>
                No Records Found
              </td>

            </tr>

          ) : (

            reports.map((item) => (

              <tr key={item.hall_ticket}>

                <td>{item.hall_ticket}</td>

                <td>{item.name}</td>

                <td>{item.present}</td>

                <td>{item.absent}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

