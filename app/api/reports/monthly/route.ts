import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const month =
      req.nextUrl.searchParams.get("month");

    const result = await pool.query(
      `
      SELECT
      hall_ticket,

      COUNT(
      CASE
      WHEN status='Present'
      THEN 1
      END
      ) AS present,

      COUNT(
      CASE
      WHEN status='Absent'
      THEN 1
      END
      ) AS absent

      FROM attendance

      WHERE TO_CHAR(
      attendance_date,
      'YYYY-MM'
      )=$1

      GROUP BY hall_ticket

      ORDER BY hall_ticket
      `,
      [month]
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