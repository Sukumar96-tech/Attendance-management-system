"use client";

import { useEffect, useState } from "react";

interface Attendance {
  id: number;
  hall_ticket: string;
  attendance_date: string;
  status: string;
}

export default function StudentHistory() {
  const [records, setRecords] = useState<Attendance[]>([]);

  // Temporary hall ticket
  const hallTicket = "23UE1A7346";

  async function loadHistory() {
    const res = await fetch(
      `/api/student/history?hall_ticket=${hallTicket}`
    );

    const data = await res.json();

    setRecords(data);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  const total = records.length;

  const present = records.filter(
    (r) => r.status === "Present"
  ).length;

  const percentage =
    total === 0
      ? 0
      : ((present / total) * 100).toFixed(2);

  return (
    <div className="student-history">

      <h1>📜 Attendance History</h1>

      <br />

      <table>

        <thead>

          <tr>

            <th>Date</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {records.length === 0 ? (

            <tr>

              <td colSpan={2}>

                No Records Found

              </td>

            </tr>

          ) : (

            records.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.attendance_date}
                </td>

                <td>
                  {item.status}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <br />

      <div className="summary-card">

        <h2>

          Attendance Percentage

        </h2>

        <h1>

          {percentage}%

        </h1>

      </div>

    </div>
  );
}