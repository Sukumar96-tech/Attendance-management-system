"use client";

import Link from "next/link";

export default function StudentProfile() {
  return (
    <div className="student-profile">

      <h1>👤 Student Profile</h1>

      <br />

      <div className="profile-card">

        <div className="profile-row">
          <strong>Hall Ticket</strong>
          <span>23UE1A7346</span>
        </div>

        <div className="profile-row">
          <strong>Name</strong>
          <span>Sukumar</span>
        </div>

        <div className="profile-row">
          <strong>Year</strong>
          <span>1st Year</span>
        </div>

        <div className="profile-row">
          <strong>Branch</strong>
          <span>AI & ML</span>
        </div>

        <div className="profile-row">
          <strong>Role</strong>
          <span>Student</span>
        </div>

      </div>

      <br />

      <Link href="/student/dashboard">
        <button className="btn">
          ← Back to Dashboard
        </button>
      </Link>

    </div>
  );
}