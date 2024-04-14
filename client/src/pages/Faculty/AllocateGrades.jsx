import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const AllocateGrades = () => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("graphCanvas");
    if (canvas) {
      plotGraph(sortedData);
    }
  }, [sortedData]);

  const generatePlot = () => {
    const fileInput = document.getElementById("csvFileInput");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const contents = event.target.result;
      const rows = contents.split("\n").map((row) => row.replace("\r", ""));
      const data = rows.map((row) => row.split(","));

      data.shift();
      data.forEach((row) => {
        row.splice(0, 5);
        row.splice(1, row.length - 1);
      });

      data.sort(
        (a, b) => parseInt(b[b.length - 1]) - parseInt(a[a.length - 1])
      );

      setSortedData(data);
    };

    reader.readAsText(file);
  };

  const calculateMean = (data) => {
    console.log(typeof data);
    const sum = data.reduce((acc, value) => acc + value, 0);
    const mean = sum / data.length;
    return mean;
  };

  const calculateStandardDeviation = (data, mean) => {
    if (mean === undefined) {
      mean = data.reduce((acc, value) => acc + value, 0) / data.length;
    }
    const deviations = data.map((value) => value - mean);
    const squaredDeviations = deviations.map((deviation) => deviation ** 2);
    const meanOfSquaredDeviations =
      squaredDeviations.reduce((acc, value) => acc + value, 0) /
      squaredDeviations.length;
    const standardDeviation = Math.sqrt(meanOfSquaredDeviations);
    return standardDeviation;
  };

  const normalDistribution = (x) => {
    const exponent = -0.5 * Math.pow(x, 2);
    const denominator = Math.sqrt(2 * Math.PI);
    return Math.exp(exponent) / denominator;
  };

  const plotGraph = (data) => {
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");

    if (canvas.chart) {
      canvas.chart.destroy();
    }

    // const xValues = data.map((row) => parseInt(row[0])); // Assuming X values are in the first column
    const xValues = data.map((row) => {
      const value = parseInt(row[0]);
      return isNaN(value) ? 0 : value;
    });

    const yValues = data.map((row) => {
      const value = parseInt(row[row.length - 1]);
      return isNaN(value) ? 0 : value;
    });
    const mean = calculateMean(yValues);
    console.log("Mean:", mean);

    const stdDev = calculateStandardDeviation(xValues, mean);
    console.log("Standard Deviation:", stdDev);

    const normalizedData = data.map((value) => (value - mean) / stdDev);
    console.log("Normalized Data:", normalizedData);

    const minX = Math.min(...normalizedData);
    const maxX = Math.max(...normalizedData);
    const step = (maxX - minX) / data.length;
    const mxValues = [];
    for (let x = minX; x <= maxX; x += step) {
      mxValues.push(x);
    }

    console.log("xValues:", xValues);
    console.log("yValues:", yValues);
    console.log("mX Values:", mxValues);

    const pdfValues = mxValues.map((x) => normalDistribution(x));
    console.log("PDF Values:", pdfValues);

    // Reverse the X values to match the PDF values
    xValues.reverse();

    // Create a new Chart instance
    canvas.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: "Graph",
            data: pdfValues,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Marks",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Students",
            },
          },
        },
      },
    });
  };

  return (
    <div>
      <input type="file" id="csvFileInput" accept=".csv" />
      <button onClick={generatePlot}>Generate Marks Data</button>
      <div>
        {/*<table>
          <thead>
            <tr>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
          </table>*/}
      </div>
      <div>
        {/* Canvas to draw the graph */}
        <canvas
          id="graphCanvas"
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>

        <table>
          <thead>
            <tr>
              <th>Grade</th>
              <th>Start Range</th>
              <th></th>
              <th>End Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AA (10)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>AB (9)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>BB (8)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>BC (7)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>CC (6)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>CD (5)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>DD (4)</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
            <tr>
              <td>FF</td>
              <td>
                <input></input>
              </td>
              <td>-</td>
              <td>
                <input></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllocateGrades;
