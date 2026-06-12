"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [password, setPassword] = useState("");

  async function changePassword() {
    const res = await fetch(
      "/api/admin/settings",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Password Updated");
      setPassword("");
    } else {
      alert(data.message);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Settings</h1>

      <br />

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button
  className="change-password-btn"
  onClick={changePassword}
>
  Change Password
</button>
    </div>
  );
}