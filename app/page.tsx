import Link from "next/link";

export default function Home() {
  return (
    <main className="home">

      <div className="home-container">

        {/* Left Section */}

        <div className="home-left">

          <h1>
            🎓 College Attendance
            <br />
            Management System
          </h1>

          <h2>
            Smart • Secure • Efficient
          </h2>

          <p>
            A modern College ERP solution for
            managing students, attendance,
            reports, analytics, and academic
            records efficiently.
          </p>

          <Link href="/login">
            <button className="home-btn">
              🚀 Get Started
            </button>
          </Link>

        </div>

        {/* Right Section */}

        <div className="home-right">

          <h2>
            ✨ Features
          </h2>

          <div className="home-features">

            <div className="feature-card">
              👨‍🎓 Student Management
            </div>

            <div className="feature-card">
              ✅ Smart Attendance
            </div>

            <div className="feature-card">
              📊 Analytics Dashboard
            </div>

            <div className="feature-card">
              📜 Attendance History
            </div>

            <div className="feature-card">
              📆 Daily & Monthly Reports
            </div>

            <div className="feature-card">
              🎓 Year-wise Reports
            </div>

            <div className="feature-card">
              📥 Export CSV
            </div>

            <div className="feature-card">
              🖨️ Print Reports
            </div>

            <div className="feature-card">
              🔒 Secure Login
            </div>

            <div className="feature-card">
              ⚙️ Admin & Student Portal
            </div>

          </div>

          <p className="home-footer">
            "Empowering colleges with digital
            attendance management and real-time
            insights."
          </p>

          <hr
            style={{
              margin: "20px 0",
              opacity: 0.3,
            }}
          />

          <div
            style={{
              textAlign: "center",
            }}
          >
            <h3>
              👨‍💻 Developed by
            </h3>

            <h2
              style={{
                color: "#facc15",
                margin: "10px 0",
              }}
            >
              Sukumar
            </h2>

            <p
              style={{
                marginBottom: "15px",
              }}
            >
              AI & ML Student | Full Stack Developer
            </p>

            <a
              href="https://protfolio-tan-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="home-btn">
                🌐 View My Portfolio
              </button>
            </a>

          </div>

        </div>

      </div>

    </main>
  );
}

