"use client";

import { useEffect, useState } from "react";

export default function AdminTopbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="topbar">

      <div>
        <h2>🎓 Attendance Management System</h2>
      </div>

      <div className="topbar-right">
        <span>{time}</span>

        <span className="admin-profile">
          👤 Admin
        </span>
      </div>

    </header>
  );
}