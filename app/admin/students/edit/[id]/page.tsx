"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStudent() {
  const params = useParams();
  const router = useRouter();

  const [hallTicket, setHallTicket] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  useEffect(() => {
    loadStudent();
  }, []);

  async function loadStudent() {
    const res = await fetch(
      `/api/students/${params.id}`
    );

    const data = await res.json();

    setHallTicket(data.hall_ticket);
    setName(data.name);
    setYear(data.year);
    setBranch(data.branch);
  }

  async function updateStudent(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      `/api/students/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          year,
          branch,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      router.push("/admin/students");
    } else {
      alert("Update Failed");
    }
  }

  return (
    <div className="students-page">

      <h1>Edit Student</h1>

      <form onSubmit={updateStudent}>

        <label>Hall Ticket</label>

        <input
          value={hallTicket}
          disabled
        />

        <label>Name</label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label>Year</label>

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

        <label>Branch</label>

        <input
          value={branch}
          onChange={(e) =>
            setBranch(e.target.value)
          }
        />

        <br />

        <button
          className="btn"
          type="submit"
        >
          Update Student
        </button>

      </form>

    </div>
  );
}