"use client";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


async function handleLogin(
  e: React.FormEvent
) {
  e.preventDefault();

  const res = await fetch(
    "/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  // Save hall ticket for student
  if (data.role === "student") {
    localStorage.setItem(
      "hall_ticket",
      data.hall_ticket
    );
  }

  if (data.role === "admin") {
    window.location.href = "/admin/dashboard";
  } else {
    window.location.href = "/student/dashboard";
  }
}


  return (
    <main className="login-page">
      <div className="login-card">

        <h1>🎓 Attendance Management System</h1>

        <p>College ERP Login</p>

        <form onSubmit={handleLogin}>

          <label>Username / Hall Ticket</label>

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        

      </div>
    </main>
  );
}