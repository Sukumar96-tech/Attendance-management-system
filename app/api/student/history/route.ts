import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: NextRequest
) {
  try {

    const hallTicket =
      req.nextUrl.searchParams.get(
        "hall_ticket"
      );

    const result =
      await pool.query(

        `
        SELECT *

        FROM attendance

        WHERE hall_ticket=$1

        ORDER BY attendance_date DESC
        `,

        [hallTicket]

      );

    return NextResponse.json(
      result.rows
    );

  } catch (error) {

    console.error(error);

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