import React, { useEffect, useState } from "react";
import axios from "axios";
const UploadMarks = () => {
  const [marksData, setMarksData] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  // Function to generate marks data for 100 rows
  const generateMarksData = () => {
    const fileInput = document.getElementById("csvFileInput");
    const file = fileInput.files[0];
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const contents = event.target.result;
      const rows = contents.split("\n");
      const data = [];

      for (let i = 1; i < rows.length - 1; i++) {
        // Skip the header row
        const rowData = rows[i].split(",");
        if (rowData.length === 0) {
          continue; // Skip empty rows
        }
        const misLabel = "mis" + i;
        const nameLabel = "name" + i;
        const t1MarksInput = "t1Marks" + i;
        const t2MarksInput = "t2Marks" + i;
        const eseMarksInput = "eseMarks" + i;
        const totalMarksLabel = "totalMarks" + i;

        const MIS = rowData[0] ? rowData[0].trim() : "";
        const Name = rowData[1] ? rowData[1].trim() : "";
        const T1 = rowData[2] ? rowData[2].trim() : "";
        const T2 = rowData[3] ? rowData[3].trim() : "";
        const ESE = rowData[4] ? rowData[4].trim() : "";

        const Total = parseInt(T1) + parseInt(T2) + parseInt(ESE);

        data.push({
          misLabel,
          nameLabel,
          t1MarksInput,
          t2MarksInput,
          eseMarksInput,
          totalMarksLabel,
          MIS,
          Name,
          T1,
          T2,
          ESE,
          Total,
        });
      }
      setMarksData(data);
      setRowCount(data.length);
    };

    reader.readAsText(file);
  };

  const handleInputChange = (e, index, property) => {
    const updatedMarksData = [...marksData]; // Create a copy of marksData array
    updatedMarksData[index][property] = e.target.value; // Update the value of the property
    setMarksData(updatedMarksData); // Update the state with the new marksData
  };

  // Function to render table rows
  const renderTableRows = () => {
    return marksData.map((rowData, index) => (
      <tr key={index}>
        <td>
          <input
            type="text"
            id={rowData.misLabel}
            value={rowData.MIS}
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            id={rowData.nameLabel}
            value={rowData.Name}
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            id={rowData.t1MarksInput}
            value={rowData.T1}
            onChange={(e) => handleInputChange(e, index, "T1")}
          />
        </td>
        <td>
          <input
            type="text"
            id={rowData.t2MarksInput}
            value={rowData.T2}
            onChange={(e) => handleInputChange(e, index, "T2")}
          />
        </td>
        <td>
          <input
            type="text"
            id={rowData.eseMarksInput}
            value={rowData.ESE}
            onChange={(e) => handleInputChange(e, index, "ESE")}
          />
        </td>
        <td>
          <input
            type="text"
            id={rowData.totalMarksLabel}
            value={rowData.Total}
            disabled
          />
        </td>
      </tr>
    ));
  };

  const uploadMarks = () => {
    const finalSubmitData = [];
    marksData.forEach((data) => {
      const { MIS, Name, T1, T2, ESE, Total } = data;
      finalSubmitData.push({ MIS, Name, T1, T2, ESE, Total });
    });
    // console.log('Final Submit Data:', finalSubmitData);
    const res = axios.post("/api/faculty/uploadMarks", { finalSubmitData });
    console.log("Ice box ", res);
  };

  const saveMarks = () => {
    // Recalculate total marks for loop
    console.log("hello");

    for (let i = 1; i <= rowCount; i++) {
      const t1MarksInput = document.getElementById("t1Marks" + i);
      const t2MarksInput = document.getElementById("t2Marks" + i);
      const eseMarksInput = document.getElementById("eseMarks" + i);
      const totalMarksLabel = document.getElementById("totalMarks" + i);

      const T1 = t1MarksInput.value ? t1MarksInput.value.trim() : "";
      const T2 = t2MarksInput.value ? t2MarksInput.value.trim() : "";
      const ESE = eseMarksInput.value ? eseMarksInput.value.trim() : "";

      const Total = parseInt(T1) + parseInt(T2) + parseInt(ESE);
      totalMarksLabel.value = Total;
    }
  };

  return (
    <div>
      <h1>Upload Marks</h1>
      {/*<input type="text" id="dept"></input><br></br>*/}
      <input type="file" id="csvFileInput" accept=".csv"></input>
      <button onClick={generateMarksData}>Generate Marks Data</button>
      <div>
        {/*<h2>Number of rows: {rowCount}</h2>*/}
        <table>
          <thead>
            <tr>
              <th>MIS</th>
              <th>Name</th>
              <th>T1 Marks</th>
              <th>T2 Marks</th>
              <th>ESE Marks</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>

      <button name="saveMarks" onClick={saveMarks}>
        Save Marks
      </button>

      <button name="uploadMarks" onClick={uploadMarks}>
        Upload Marks
      </button>
    </div>
  );
};

export default UploadMarks;
