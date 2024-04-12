import React from "react";
import { Fragment } from "react";
import { useState } from "react";
const Home = () => {
  const [finalAllocation, setFinalAllocation] = useState([]);
  const updateFinalAllocation = (newArray) => {
    setFinalAllocation([...newArray]);
  };

  const data = [
    {
      srNo: "1",
      name: "Sarvesh Kulkarni",
      sgpa: "7.76",
      cgpa: "7.76",
      preferences: {
        WST: "1",
        ADS: "2",
        SP: "3",
      },
    },
    {
      srNo: "2",
      name: "Sanchit Rajmane",
      sgpa: "8.27",
      cgpa: "8.05",
      preferences: {
        WST: "1",
        ADS: "2",
        SP: "3",
      },
    },
    {
      srNo: "3",
      name: "Aditya raul",
      sgpa: "6.87",
      cgpa: "7.00",
      preferences: {
        SP: "1",
        ADS: "2",
        WST: "3",
      },
    },
    {
      srNo: "4",
      name: "Sohel Bargir",
      sgpa: "9.87",
      cgpa: "8.30",
      preferences: {
        WST: "1",
        ADS: "3",
        SP: "2",
      },
    },
    {
      srNo: "5",
      name: "Avdhut Kamblr",
      sgpa: "8.87",
      cgpa: "7.10",
      preferences: {
        WST: "1",
        ADS: "2",
        SP: "3",
      },
    },
  ];
  var WTCSeats = 2,
    SPSeats = 2,
    ADSSeats = 3;
  const total = WTCSeats + SPSeats + ADSSeats;
  const sortDataByCGPAAndSGPA = (data) => {
    return data.sort((a, b) => {
      if (parseFloat(a.cgpa) !== parseFloat(b.cgpa)) {
        return parseFloat(b.cgpa) - parseFloat(a.cgpa); // Descending order
      } else {
        return parseFloat(b.sgpa) - parseFloat(a.sgpa); // Descending order
      }
    });
  };
  const Seats = { WST: 2, SP: 2, ADS: 2 };
  const allocateSubjects = (data) => {
    if (data.length > total) {
      console.log("Allocation not possible");
      return;
    }
    sortDataByCGPAAndSGPA(data);
    let arr = [];

    data.forEach((element, index) => {
      const { preferences, ...rest } = element; //Destructure preferences
      let flag = false;
      for (let preference in element.preferences) {
        for (let i = 0; i < preference.length; i++) {
          if (flag) {
            break;
          }
          if (Seats[preference] > 0) {
            Seats[preference]--;
            rest.preference = preference;
            rest.preferenceNo = preferences[preference];
            arr.push(rest);
            flag = true;
          }
        }
      }
    });
    updateFinalAllocation(arr);
    // console.log(arr);

    //iterate over datas and get preference
  };
  return (
    <Fragment>
      <div>
        {finalAllocation.length === 0 ? (
          <h1>Khane ko daal nah hai</h1>
        ) : (
          <div></div>
        )}
      </div>
      <button onClick={() => allocateSubjects(data)}>Clici me</button>
      <div> Sarvesh Anant Kulkarni</div>
      <table>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>SGPA</th>
          <th>CGPA</th>
          <th>Subject Alloted</th>
          <th>Preference</th>
        </tr>
        {finalAllocation.map((element, index) => (
          <tr key={index}>
            <td>{element.srNo}</td>
            <td>{element.name}</td>
            <td>{element.sgpa}</td>
            <td>{element.cgpa}</td>
            <td>{element.preference}</td>
            <td>{element.preferenceNo}</td>
          </tr>
        ))}
      </table>
    </Fragment>
  );
};
export default Home;
