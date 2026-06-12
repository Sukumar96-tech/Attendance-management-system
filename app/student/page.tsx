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

  async function loadStudents(
    searchValue = "",
    yearValue = "All"
  ) {
    const res = await fetch(
      `/api/students?search=${searchValue}&year=${yearValue}`
    );

    const data = await res.json();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function deleteStudent(id: number) {
    const ok = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!ok) return;

    const res = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadStudents(search, year);
    } else {
      alert("Failed to delete student");
    }
  }

  return (
    <div>
      <h1>Student Management System</h1>

      <hr />

      <h3>Total Students: {students.length}</h3>

      <br />

      <Link href="/students/add">
        <button>Add Student</button>
      </Link>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search by Hall Ticket or Name"
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

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hall Ticket</th>
            <th>Name</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.hall_ticket}</td>
                <td>{student.name}</td>
                <td>{student.year}</td>
                <td>{student.branch}</td>
                <td>
                  <Link href={`/students/edit/${student.id}`}>
                    <button>Edit</button>
                  </Link>

                  {" "}

                  <button
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}