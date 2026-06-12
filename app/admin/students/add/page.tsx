"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudent() {
  const router = useRouter();

  const [hallTicket, setHallTicket] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("1st Year");
  const [branch, setBranch] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/students",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          hall_ticket: hallTicket,
          name,
          year,
          branch,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Student Added Successfully");
      router.push("/admin/students");
    } else {
      alert(
        data.message ||
          "Failed to add student"
      );
    }
  }

  return (
    <div className="students-page">

      <h1>Add Student</h1>

      <br />

      <form onSubmit={handleSubmit}>

        <label>
          Hall Ticket
        </label>

        <input
          type="text"
          value={hallTicket}
          onChange={(e) =>
            setHallTicket(
              e.target.value
            )
          }
          required
        />

        <label>
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

        <label>
          Year
        </label>

        <select
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value
            )
          }
        >
          <option>
            1st Year
          </option>
          <option>
            2nd Year
          </option>
          <option>
            3rd Year
          </option>
          <option>
            4th Year
          </option>
        </select>

        <label>
          Branch
        </label>

        <input
          type="text"
          value={branch}
          onChange={(e) =>
            setBranch(
              e.target.value
            )
          }
          required
        />

        <br />

        <button
          className="btn"
          type="submit"
        >
          Save Student
        </button>

      </form>

    </div>
  );
}