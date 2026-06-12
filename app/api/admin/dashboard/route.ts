import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const totalStudents = await pool.query(
      "SELECT COUNT(*) FROM students"
    );

    const presentToday = await pool.query(
      `
      SELECT COUNT(*)
      FROM attendance
      WHERE attendance_date=CURRENT_DATE
      AND status='Present'
      `
    );

    const absentToday = await pool.query(
      `
      SELECT COUNT(*)
      FROM attendance
      WHERE attendance_date=CURRENT_DATE
      AND status='Absent'
      `
    );

    const firstYear = await pool.query(
      "SELECT COUNT(*) FROM students WHERE year='1st Year'"
    );

    const secondYear = await pool.query(
      "SELECT COUNT(*) FROM students WHERE year='2nd Year'"
    );

    const thirdYear = await pool.query(
      "SELECT COUNT(*) FROM students WHERE year='3rd Year'"
    );

    const fourthYear = await pool.query(
      "SELECT COUNT(*) FROM students WHERE year='4th Year'"
    );

    return NextResponse.json({
      totalStudents: Number(totalStudents.rows[0].count),
      presentToday: Number(presentToday.rows[0].count),
      absentToday: Number(absentToday.rows[0].count),
      firstYear: Number(firstYear.rows[0].count),
      secondYear: Number(secondYear.rows[0].count),
      thirdYear: Number(thirdYear.rows[0].count),
      fourthYear: Number(fourthYear.rows[0].count),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}