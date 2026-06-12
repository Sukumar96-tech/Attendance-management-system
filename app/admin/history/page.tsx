"use client";

import { useEffect, useState } from "react";

export default function AdminHistory() {
  const [history, setHistory] = useState<any[]>([]);

  async function loadHistory() {
    const res = await fetch("/api/history");
    const data = await res.json();
    setHistory(data);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Attendance History</h1>

      <br />

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Hall Ticket</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan={3}>No Records Found</td>
            </tr>
          ) : (
            history.map((item) => (
              <tr key={item.id}>
                <td>{item.hall_ticket}</td>
                <td>{item.attendance_date}</td>
                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}