import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {

    const search =
      req.nextUrl.searchParams.get("search") || "";

    const date =
      req.nextUrl.searchParams.get("date") || "";

    let query = `
      SELECT *
      FROM attendance
      WHERE 1=1
    `;

    const values: any[] = [];
    let index = 1;

    if (search) {
      query += `
        AND hall_ticket ILIKE $${index}
      `;
      values.push(`%${search}%`);
      index++;
    }

    if (date) {
      query += `
        AND attendance_date=$${index}
      `;
      values.push(date);
      index++;
    }

    query += `
      ORDER BY attendance_date DESC,
      hall_ticket
    `;

    const result = await pool.query(
      query,
      values
    );

    return NextResponse.json(result.rows);

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