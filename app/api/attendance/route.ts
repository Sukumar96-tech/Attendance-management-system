import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const year = req.nextUrl.searchParams.get("year");

    console.log("Year =", year);

    const result = await pool.query(
      `
      SELECT id, hall_ticket, name
      FROM students
      WHERE year = $1
      `,
      [year]
    );

    console.log(result.rows);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("Attendance API Error:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}