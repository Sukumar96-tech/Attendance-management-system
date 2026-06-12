import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { date, attendance } = await req.json();

    if (!date) {
      return NextResponse.json(
        {
          message: "Please select a date",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent marking attendance for future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return NextResponse.json(
        {
          message:
            "❌ You cannot mark attendance for a future date.",
        },
        {
          status: 400,
        }
      );
    }

    for (const student of attendance) {
      const check = await pool.query(
        `
        SELECT id
        FROM attendance
        WHERE hall_ticket=$1
        AND attendance_date=$2
        `,
        [
          student.hall_ticket,
          date,
        ]
      );

      if (check.rows.length > 0) {
        await pool.query(
          `
          UPDATE attendance
          SET status=$1
          WHERE hall_ticket=$2
          AND attendance_date=$3
          `,
          [
            student.status,
            student.hall_ticket,
            date,
          ]
        );
      } else {
        await pool.query(
          `
          INSERT INTO attendance
          (
            hall_ticket,
            attendance_date,
            status
          )
          VALUES
          (
            $1,
            $2,
            $3
          )
          `,
          [
            student.hall_ticket,
            date,
            student.status,
          ]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "✅ Attendance Saved Successfully",
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

