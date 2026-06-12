
"use client";

export default function PrintButton() {
  function printReport() {
    window.print();
  }

  return (
    <button
      className="btn"
      onClick={printReport}
    >
      🖨️ Print Report
    </button>
  );
}

