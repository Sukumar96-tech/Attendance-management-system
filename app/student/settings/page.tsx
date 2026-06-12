"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentSettings() {
  const router = useRouter();

  const [hallTicket] = useState("23UE1A7346"); // Temporary
  const [newPassword, setNewPassword] = useState("");

  async function changePassword() {
    if (newPassword.trim() === "") {
      alert("Please enter a new password");
      return;
    }

    const res = await fetch("/api/student/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: hallTicket,
        password: newPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setNewPassword("");
    } else {
      alert(data.message);
    }
  }

  async function logout() {

  const confirmLogout = confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  await fetch("/api/logout", {
    method: "POST",
  });

  router.push("/login");
}

  return (
    <div className="student-settings">

      <h1>⚙️ Student Settings</h1>

      <br />

      <label>New Password</label>

      <input
        type="password"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button
        className="btn"
        onClick={changePassword}
      >
        Change Password
      </button>

      <br />
      <br />

      <button
        className="btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}