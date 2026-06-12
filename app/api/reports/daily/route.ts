import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const date =
      req.nextUrl.searchParams.get("date");

    const result = await pool.query(
      `
      SELECT
      hall_ticket,
      attendance_date,
      status
      FROM attendance
      WHERE attendance_date=$1
      ORDER BY hall_ticket
      `,
      [date]
    );

    return NextResponse.json(result.rows);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}