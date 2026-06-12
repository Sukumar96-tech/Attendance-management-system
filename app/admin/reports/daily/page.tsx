
"use client";

import { useState } from "react";

interface Report {
  hall_ticket: string;
  name: string;
  status: string;
}

export default function DailyReport() {
  const [date, setDate] = useState("");
  const [reports, setReports] = useState<Report[]>([]);

  async function loadReport() {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const res = await fetch(
      `/api/reports/daily?date=${date}`
    );

    const data = await res.json();

    setReports(data);
  }

  return (
    <div className="reports-page">

      <h1>📅 Daily Attendance Report</h1>

      <br />

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
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

        
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {reports.length === 0 ? (

            <tr>

              <td colSpan={3}>
                No Records Found
              </td>

            </tr>

          ) : (

            reports.map((item) => (

              <tr key={item.hall_ticket}>

                <td>{item.hall_ticket}</td>

                <td>{item.name}</td>

                <td>{item.status}</td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

