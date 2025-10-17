// -----------------------------
// 📄 ContestCard.jsx
// ➤ Reusable component to render individual contest card UI
// ➤ Used inside ContestPage.jsx
// -----------------------------

import React from "react";
import { Link } from "react-router-dom";

export default function ContestCard({ contest }) {
  console.log("Contest data:", contest);

  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid #2d2d2d",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "460px",
      }}
    >
      <h3
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "12px",
          ...(contest.gradientStart && contest.gradientEnd
            ? {
                background: `linear-gradient(to right, ${contest.gradientStart}, ${contest.gradientEnd})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            : {
                color: "#ffffff",
              }),
        }}
      >
        {contest.title}
      </h3>

      {/* Other parts */}
      <p style={{ fontSize: "15px", color: "#9ca3af", marginBottom: "16px" }}>
        {contest.description}
      </p>

      <img
        src={contest.image}
        alt={contest.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "16px",
        }}
      />

      <div style={{ fontSize: "14px", color: "#d1d5db", marginBottom: "16px" }}>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              fontWeight: "bold",
              color: contest.status === "Upcoming" ? "#22c55e" : "#ef4444",
            }}
          >
            {contest.status}
          </span>
        </p>
        <p>
          <strong>Starts:</strong> {contest.starts}
        </p>
        <p>
          <strong>Ends:</strong> {contest.ends}
        </p>
      </div>

      <Link
        to={`/contests/${contest.id}`}
        style={{
          display: "block",
          textAlign: "center",
          background:
            contest.buttonGradient ||
            `linear-gradient(to right, ${contest.gradientStart}, ${contest.gradientEnd})`,
          color: "#fff",
          fontWeight: "bold",
          padding: "12px 18px",
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        View Contest
      </Link>
    </div>
  );
}
