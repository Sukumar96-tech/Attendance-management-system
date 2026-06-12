"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Student {
  id: number;
  hall_ticket: string;
  name: string;
  year: string;
  branch: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents(
    searchValue = search,
    yearValue = year
  ) {
    const res = await fetch(
      `/api/students?search=${encodeURIComponent(
        searchValue
      )}&year=${encodeURIComponent(yearValue)}`
    );

    const data = await res.json();
    setStudents(data);
  }

  async function deleteStudent(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `/api/students/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      loadStudents();
    } else {
      alert(data.message || "Delete failed");
    }
  }

  return (
    <div className="students-page">

      <div className="students-header">

        <h1>Students Management</h1>

        <Link href="/admin/students/add">
          <button className="btn">
            + Add Student
          </button>
        </Link>

      </div>

      <br />

      <input
        type="text"
        placeholder="Search Hall Ticket or Name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          loadStudents(e.target.value, year);
        }}
      />

      <br />
      <br />

      <select
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          loadStudents(search, e.target.value);
        }}
      >
        <option>All</option>
        <option>1st Year</option>
        <option>2nd Year</option>
        <option>3rd Year</option>
        <option>4th Year</option>
      </select>

      <br />
      <br />

      <table>

        <thead>
          <tr>
            <th>Hall Ticket</th>
            <th>Name</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 ? (
            <tr>
              <td colSpan={5}>
                No Students Found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>

                <td>{student.hall_ticket}</td>

                <td>{student.name}</td>

                <td>{student.year}</td>

                <td>{student.branch}</td>

                <td>

                  <Link
                    href={`/admin/students/edit/${student.id}`}
                  >
                    <button>
                      Edit
                    </button>
                  </Link>

                  {" "}

                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}