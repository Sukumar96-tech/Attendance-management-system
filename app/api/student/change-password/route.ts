import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    await pool.query(
      `
      UPDATE users
      SET password=$1
      WHERE username=$2
      `,
      [password, username]
    );

    return NextResponse.json({
      success: true,
      message: "Password Updated Successfully",
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