"use client";

import { useEffect, useState } from "react";

export default function Reports() {
  const [reports, setReports] = useState<any[]>([]);
  const [hallTicket, setHallTicket] = useState("");

  async function loadReports(value = "") {
    const res = await fetch(
      `/api/reports?hall_ticket=${value}`
    );

    const data = await res.json();

    setReports(data);
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div>

      <h1>Attendance Reports</h1>

      <br />

      <input
        type="text"
        placeholder="Search Hall Ticket"
        value={hallTicket}
        onChange={(e) => {
          setHallTicket(e.target.value);
          loadReports(e.target.value);
        }}
      />

      <br />
      <br />

      <table border={1} cellPadding={8}>

        <thead>

          <tr>

            <th>Hall Ticket</th>

            <th>Total Classes</th>

            <th>Present</th>

            <th>Attendance %</th>

          </tr>

        </thead>

        <tbody>

          {reports.length > 0 ? (
            reports.map((item, index) => (
              <tr key={index}>

                <td>{item.hall_ticket}</td>

                <td>{item.total_classes}</td>

                <td>{item.present_classes}</td>

                <td>{item.percentage}%</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                No records found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}