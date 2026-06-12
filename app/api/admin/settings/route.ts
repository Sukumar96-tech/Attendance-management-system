import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(
  req: NextRequest
) {
  try {
    const { password } = await req.json();

    await pool.query(
      `
      UPDATE users
      SET password=$1
      WHERE role='admin'
      `,
      [password]
    );

    return NextResponse.json({
      success: true,
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