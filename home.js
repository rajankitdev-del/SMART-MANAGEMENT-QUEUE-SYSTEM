// src/pages/Home.jsx

import React from "react";
import InfoCard from "../components/InfoCard";

export default function Home() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Smart AI Queue System</h1>

      <InfoCard title="Queue Position" value="#12" />
      <InfoCard title="Estimated Wait Time" value="15 mins" />
    </div>
  );
}