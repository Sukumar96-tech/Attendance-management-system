
"use client";

import { useState } from "react";

interface Report {
  hall_ticket: string;
  name: string;
  year: string;
  present: number;
  absent: number;
  total: number;
  percentage: number;
}

export default function YearwiseReport() {
  const [year, setYear] = useState("1st Year");
  const [reports, setReports] = useState<Report[]>([]);

  async function loadReport() {
    const res = await fetch(
      `/api/reports/yearwise?year=${encodeURIComponent(year)}`
    );

    const data = await res.json();

    setReports(data);
  }

  return (
    <div className="reports-page">

      <h1>🎓 Year-wise Attendance Report</h1>

      <br />

      <select
        value={year}
        onChange={(e) =>
          setYear(e.target.value)
        }
      >
        <option>1st Year</option>
        <option>2nd Year</option>
        <option>3rd Year</option>
        <option>4th Year</option>
      </select>

      <button
        className="btn"
        onClick={loadReport}
      >
        Load Report
      </button>

      <br />
      <br />

      <table>

        <thead>

          <tr>
            <th>Hall Ticket</th>
            <th>Name</th>
            <th>Year</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Total</th>
            <th>Percentage</th>
          </tr>

        </thead>

        <tbody>

          {reports.length === 0 ? (

            <tr>
              <td colSpan={7}>
                No Records Found
              </td>
            </tr>

          ) : (

            reports.map((item) => (

              <tr key={item.hall_ticket}>

                <td>{item.hall_ticket}</td>

                <td>{item.name}</td>

                <td>{item.year}</td>

                <td>{item.present}</td>

                <td>{item.absent}</td>

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

