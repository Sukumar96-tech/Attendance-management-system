
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Find user
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE username = $1
      `,
      [username]
    );

    // User not found
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Username or Password",
        },
        {
          status: 401,
        }
      );
    }

    const user = result.rows[0];

    // Plain text password check
    if (password !== user.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Username or Password",
        },
        {
          status: 401,
        }
      );
    }

    // Login successful
    
const response = NextResponse.json({
  success: true,
  role: user.role,
  hall_ticket: user.username,
});


    // Set cookies
    response.cookies.set("user", user.username, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    response.cookies.set("role", user.role, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

