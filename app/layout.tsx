import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Attendance Management System",
  description: "Attendance Management System for College ",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}