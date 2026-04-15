import React from "react";

export default function InfoCard({ title, value }) {
  return (
    <div className="card">
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ color: "#6b7280" }}>{value}</p>
    </div>
  );
}
