import React, { useEffect, useState } from 'react';
import axios from 'axios'
const UploadMarks = () => {
  const [marksData, setMarksData] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  // Function to generate marks data for 100 rows
  const generateMarksData = () => {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a CSV file.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const contents = event.target.result;
      const rows = contents.split('\n');
      const data = [];
  
      for (let i = 1; i < rows.length-1; i++) { // Skip the header row
        const rowData = rows[i].split(',');
        if (rowData.length === 0) {
          continue; // Skip empty rows
        }
        const misLabel = "mis" + i;
        const nameLabel = "name" + i;
        const t1MarksInput = "t1Marks" + i;
        const t2MarksInput = "t2Marks" + i;
        const eseMarksInput = "eseMarks" + i;
        const totalMarksLabel = "totalMarks" + i;
  
        const MIS = rowData[0] ? rowData[0].trim() : '';
        const Name = rowData[1] ? rowData[1].trim() : '';
        const T1 = rowData[2] ? rowData[2].trim() : '';
        const T2 = rowData[3] ? rowData[3].trim() : '';
        const ESE = rowData[4] ? rowData[4].trim() : '';
  
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
          Total
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
      <tr class="bg-white border-b dark:bg-white-800 dark:border-black-700 hover:bg-white-50 dark:hover:bg-white-600" key={index}>
        <td class="px-6 py-4"><input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id={rowData.misLabel} value={rowData.MIS} disabled required /></td>
        <td class="px-6 py-4"><input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id={rowData.nameLabel} value={rowData.Name} disabled required /></td>
        <td class="px-6 py-4"><input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id={rowData.t1MarksInput} value={rowData.T1} onChange={(e) => handleInputChange(e, index, 'T1')} required /></td>
        <td class="px-6 py-4"><input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id={rowData.t2MarksInput} value={rowData.T2} onChange={(e) => handleInputChange(e, index, 'T2')} required /></td>
        <td class="px-6 py-4"><input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id={rowData.eseMarksInput} value={rowData.ESE} onChange={(e) => handleInputChange(e, index, 'ESE')} required /></td>
        <td class="px-6 py-4"><input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id={rowData.totalMarksLabel} value={rowData.Total} disabled required /></td>
      </tr>
    ));
  };

  const uploadMarks = () => {
    const finalSubmitData = [];
    marksData.forEach(data => {
      const { MIS, Name, T1, T2, ESE, Total } = data;
      finalSubmitData.push({ MIS, Name, T1, T2, ESE, Total });
    });
    // console.log('Final Submit Data:', finalSubmitData);
    const res = axios.post('/api/faculty/uploadMarks', { finalSubmitData });
    console.log("Ice box ",res);
  };

  const saveMarks = () => {
    // Recalculate total marks for loop
    console.log("hello")

    for (let i = 1; i <= rowCount; i++) {    
      const t1MarksInput = document.getElementById('t1Marks' + i);
      const t2MarksInput = document.getElementById('t2Marks' + i);
      const eseMarksInput = document.getElementById('eseMarks' + i);
      const totalMarksLabel = document.getElementById('totalMarks' + i);

      const T1 = t1MarksInput.value ? t1MarksInput.value.trim() : '';
      const T2 = t2MarksInput.value ? t2MarksInput.value.trim() : '';
      const ESE = eseMarksInput.value ? eseMarksInput.value.trim() : '';

      const Total = parseInt(T1) + parseInt(T2) + parseInt(ESE);
      totalMarksLabel.value = Total;

    }
  }

  return (
    <div>
      <input type="text" class="bg-white-50 border border-black-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id="subCode" value="S2" disabled required />
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
      <input class="block w-full text-sm text-black-900 border border-black-300 rounded-lg cursor-pointer bg-white-50 dark:text-black-400 focus:outline-none dark:bg-white-700 dark:border-black-600" aria-describedby="file_input_help" id="csvFileInput" type="file" />
      <p class="mt-1 text-sm text-black-500 dark:text-black-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={generateMarksData}>Import Data</button>
      <div>
        {/*<h2>Number of rows: {rowCount}</h2>*/}
        
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">MIS</th>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">T1 Marks</th>
              <th scope="col" class="px-6 py-3">T2 Marks</th>
              <th scope="col" class="px-6 py-3">ESE Marks</th>
              <th scope="col" class="px-6 py-3">Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
        </div>
      </div>

      <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" name='saveMarks' onClick={saveMarks}>Update</button>
      <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" name='uploadMarks' onClick={uploadMarks}>Submit</button>
    </div>
  );
};

export default UploadMarks;
