
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardCard from "@/components/DashboardCard";
import QuickActions from "@/components/QuickActions";
import RecentActivity from "@/components/RecentActivity";
import Statistics from "@/components/Statistics";

export default function Dashboard() {
  const router = useRouter();

  const [data, setData] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    firstYear: 0,
    secondYear: 0,
    thirdYear: 0,
    fourthYear: 0,
  });

  async function loadDashboard() {
    const res = await fetch("/api/admin/dashboard");
    const result = await res.json();
    setData(result);
  }

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
<br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Admin Dashboard</h1>

        
      </div>

      <div className="cards">

        <DashboardCard
          title="Total Students"
          value={data.totalStudents}
        />

        <DashboardCard
          title="Present Today"
          value={data.presentToday}
        />

        <DashboardCard
          title="Absent Today"
          value={data.absentToday}
        />

        <DashboardCard
          title="1st Year"
          value={data.firstYear}
        />

        <DashboardCard
          title="2nd Year"
          value={data.secondYear}
        />

        <DashboardCard
          title="3rd Year"
          value={data.thirdYear}
        />

        <DashboardCard
          title="4th Year"
          value={data.fourthYear}
        />

      </div>

      <br />

      <QuickActions />

      <br />

      <RecentActivity />

      <br />

      <Statistics />

    </div>
  );
}

