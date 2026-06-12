"use client";

import { useState } from "react";

interface Student {
  id: number;
  hall_ticket: string;
  name: string;
}

export default function Attendance() {
  const [year, setYear] = useState("1st Year");
  const [date, setDate] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<any>({});

  async function loadStudents() {
    const res = await fetch(
      `/api/attendance?year=${encodeURIComponent(year)}`
    );

    const data = await res.json();

    setStudents(Array.isArray(data) ? data : []);
  }

  function markAllPresent() {
    const obj: any = {};

    students.forEach((student) => {
      obj[student.hall_ticket] = "Present";
    });

    setAttendance(obj);
  }

  function markAllAbsent() {
    const obj: any = {};

    students.forEach((student) => {
      obj[student.hall_ticket] = "Absent";
    });

    setAttendance(obj);
  }

  async function saveAttendance() {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      alert("❌ You cannot mark attendance for a future date.");
      return;
    }

    const list = students.map((student) => ({
      hall_ticket: student.hall_ticket,
      status:
        attendance[student.hall_ticket] || "Absent",
    }));

    const res = await fetch(
      "/api/attendance/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year,
          date,
          attendance: list,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("✅ Attendance Saved");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="attendance-page">

      <h1>Attendance Management</h1>

      <br />

      <label>Select Year</label>

      <br />

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

      <br />
      <br />

      <label>Select Date</label>

      <br />

      <input
        type="date"
        value={date}
        max={new Date().toISOString().split("T")[0]}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={loadStudents}>
        📋 Load Students
      </button>

      <button
        onClick={markAllPresent}
        style={{ marginLeft: 10 }}
      >
        🟢 Mark All Present
      </button>

      <button
        onClick={markAllAbsent}
        style={{ marginLeft: 10 }}
      >
        🔴 Mark All Absent
      </button>

      <br />
      <br />

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Hall Ticket</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={3}>
                No Students Loaded
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.hall_ticket}</td>

                <td>{student.name}</td>

                <td>
                  <select
                    value={
                      attendance[
                        student.hall_ticket
                      ] || "Absent"
                    }
                    onChange={(e) =>
                      setAttendance({
                        ...attendance,
                        [student.hall_ticket]:
                          e.target.value,
                      })
                    }
                  >
                    <option value="Present">
                      Present
                    </option>

                    <option value="Absent">
                      Absent
                    </option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <br />

      <button onClick={saveAttendance}>
        💾 Save Attendance
      </button>

    </div>
  );
}
