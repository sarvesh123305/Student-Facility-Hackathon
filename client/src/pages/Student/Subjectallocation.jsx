import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../../css/Subjectallocation.css";

function Subjectallocation() {
  const options = ["WST", "ADS", "SP"];

  return (
    <div className="electives bg-white">
      <h1>
        <b>Electives Allocation</b>
      </h1>
      <div className="electivesform">
        <div className="info">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h4>MIS</h4>
            <TextField
              required
              id="standard-basic"
              label="MIS"
              variant="standard"
            />
            <h4>branch</h4>
            <TextField
              required
              id="standard-basic"
              label="branch"
              variant="standard"
            />
            <h4>Mail Id</h4>
            <TextField
              required
              id="standard-required"
              label="Mail Id"
              variant="standard"
            />
          </Box>
        </div>
        <div className="preference">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Preference 1" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Preference 2" />
            )}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Preference 3" />
            )}
          />
        </div>
      </div>
      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded inline-block">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Subjectallocation;
