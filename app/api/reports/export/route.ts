import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        s.hall_ticket,
        s.name,
        s.year,

        COUNT(
          CASE
            WHEN a.status='Present'
            THEN 1
          END
        ) AS present,

        COUNT(
          CASE
            WHEN a.status='Absent'
            THEN 1
          END
        ) AS absent,

        COUNT(a.id) AS total

      FROM students s

      LEFT JOIN attendance a
      ON s.hall_ticket = a.hall_ticket

      GROUP BY
        s.hall_ticket,
        s.name,
        s.year

      ORDER BY
        s.hall_ticket
    `);

    let csv =
      "Hall Ticket,Name,Year,Present,Absent,Total\n";

    result.rows.forEach((row: any) => {
      csv += `${row.hall_ticket},${row.name},${row.year},${row.present},${row.absent},${row.total}\n`;
    });

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="attendance_report.csv"',
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to export report",
      },
      {
        status: 500,
      }
    );
  }
}