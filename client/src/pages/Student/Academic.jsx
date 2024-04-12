import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../../css/Academic.css";

const SGPA = [8.05, 8.86, 6.86, 6.96, 7.65];
const CGPA = [8.05, 8.45, 7.91, 7.65, 7.65];

const xLabels = [
  "SEM1",
  "SEM2",
  "SEM3",
  "SEM4",
  "SEM5",
  "SEM6",
  "SEM7",
  "SEM8",
];

function Academic() {
  return (
    <div className="resultBar mx-auto my-8">
      <h1>
        <b>Semester-Wise Performance</b>
      </h1>

      <BarChart
        className="w-160 sm:w-180"
        height={400}
        series={[
          { data: SGPA, label: "SGPA", id: "pvId" },

          { data: CGPA, label: "CGPA", id: "uvId" },
        ]}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
      />
    </div>
  );
}

export default Academic;
