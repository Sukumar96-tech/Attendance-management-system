
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const search =
      req.nextUrl.searchParams.get("search") || "";

    const year =
      req.nextUrl.searchParams.get("year") || "All";

    let query = `
      SELECT *
      FROM students
      WHERE
      (
        hall_ticket ILIKE $1
        OR
        name ILIKE $1
      )
    `;

    const values: any[] = [`%${search}%`];

    if (year !== "All") {
      query += ` AND year = $2`;
      values.push(year);
    }

    query += ` ORDER BY hall_ticket`;

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch students",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      hall_ticket,
      name,
      year,
      branch,
    } = await req.json();

    const exists = await pool.query(
      `
      SELECT *
      FROM students
      WHERE hall_ticket=$1
      `,
      [hall_ticket]
    );

    if (exists.rows.length > 0) {
      return NextResponse.json(
        {
          message: "Hall Ticket already exists",
        },
        {
          status: 400,
        }
      );
    }

    await pool.query(
      `
      INSERT INTO students
      (hall_ticket,name,year,branch)
      VALUES
      ($1,$2,$3,$4)
      `,
      [hall_ticket, name, year, branch]
    );

    await pool.query(
      `
      INSERT INTO users
      (username,password,role)
      VALUES
      ($1,$2,$3)
      `,
      [hall_ticket, hall_ticket, "student"]
    );

    return NextResponse.json({
      success: true,
      message: "Student Added Successfully",
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

