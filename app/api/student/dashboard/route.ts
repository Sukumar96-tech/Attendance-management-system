import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const hall_ticket =
      req.nextUrl.searchParams.get("hall_ticket");

    if (!hall_ticket) {
      return NextResponse.json(
        {
          message: "Hall Ticket is required",
        },
        {
          status: 400,
        }
      );
    }

    // Total attendance records
    const totalResult = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM attendance
      WHERE hall_ticket=$1
      `,
      [hall_ticket]
    );

    // Present records
    const presentResult = await pool.query(
      `
      SELECT COUNT(*) AS present
      FROM attendance
      WHERE hall_ticket=$1
      AND status='Present'
      `,
      [hall_ticket]
    );

    const total = Number(
      totalResult.rows[0].total
    );

    const present = Number(
      presentResult.rows[0].present
    );

    const percentage =
      total === 0
        ? 0
        : Math.round((present / total) * 100);

    // Today's status
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const todayResult = await pool.query(
      `
      SELECT status
      FROM attendance
      WHERE hall_ticket=$1
      AND attendance_date=$2
      `,
      [
        hall_ticket,
        today,
      ]
    );

    const todayStatus =
      todayResult.rows.length > 0
        ? todayResult.rows[0].status
        : "--";

    return NextResponse.json({
      percentage,
      todayStatus,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}