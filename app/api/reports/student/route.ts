import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        s.hall_ticket,
        s.name,

        COUNT(
          CASE
            WHEN a.status='Present'
            THEN 1
          END
        ) AS present,

        COUNT(a.id) AS total

      FROM students s

      LEFT JOIN attendance a

      ON s.hall_ticket = a.hall_ticket

      GROUP BY
        s.hall_ticket,
        s.name

      ORDER BY
        s.hall_ticket
    `);

    const reports = result.rows.map((row: any) => {
      const present = Number(row.present);
      const total = Number(row.total);

      return {
        hall_ticket: row.hall_ticket,
        name: row.name,
        present,
        total,
        percentage:
          total === 0
            ? 0
            : Number(
                ((present / total) * 100).toFixed(2)
              ),
      };
    });

    return NextResponse.json(reports);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to generate report",
      },
      {
        status: 500,
      }
    );
  }
}