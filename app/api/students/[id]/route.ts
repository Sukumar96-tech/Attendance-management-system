
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

/* ===========================
   GET SINGLE STUDENT
=========================== */

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const result = await pool.query(
      `
      SELECT *
      FROM students
      WHERE id=$1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result.rows[0]);
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

/* ===========================
   UPDATE STUDENT
=========================== */

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const {
      name,
      year,
      branch,
    } = await req.json();

    await pool.query(
      `
      UPDATE students
      SET
      name=$1,
      year=$2,
      branch=$3
      WHERE id=$4
      `,
      [
        name,
        year,
        branch,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Student Updated",
    });
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

/* ===========================
   DELETE STUDENT
=========================== */

export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const student = await pool.query(
      `
      SELECT hall_ticket
      FROM students
      WHERE id=$1
      `,
      [id]
    );

    if (student.rows.length === 0) {
      return NextResponse.json(
        {
          message: "Student not found",
        },
        {
          status: 404,
        }
      );
    }

    const hallTicket =
      student.rows[0].hall_ticket;

    await pool.query(
      `
      DELETE FROM students
      WHERE id=$1
      `,
      [id]
    );

    await pool.query(
      `
      DELETE FROM users
      WHERE username=$1
      `,
      [hallTicket]
    );

    return NextResponse.json({
      success: true,
      message: "Student Deleted",
    });
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

