
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const year =
      req.nextUrl.searchParams.get("year");

    const result = await pool.query(
      `
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

      ON s.hall_ticket=a.hall_ticket

      WHERE s.year=$1

      GROUP BY
      s.hall_ticket,
      s.name,
      s.year

      ORDER BY
      s.hall_ticket
      `,
      [year]
    );

    const reports = result.rows.map(
      (row: any) => {

        const present =
          Number(row.present);

        const total =
          Number(row.total);

        return {

          hall_ticket:
            row.hall_ticket,

          name:
            row.name,

          year:
            row.year,

          present,

          absent:
            Number(row.absent),

          total,

          percentage:
            total === 0
              ? 0
              : Number(
                  (
                    (present /
                      total) *
                    100
                  ).toFixed(2)
                ),

        };

      }
    );

    return NextResponse.json(
      reports
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to generate report",
      },
      {
        status: 500,
      }
    );

  }
}

