import React from "react";

const Academic = () => {
  return <div>Academic</div>;
};

export default Academic;
// import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import "../../css/Academic.css";
// import Box from "@mui/material/Box";
// import {
//   DataGridPremium,
//   GridToolbar,
//   useGridApiRef,
//   useKeepGroupedColumnsHidden,
// } from "@mui/x-data-grid-premium";
// import { useDemoData } from "@mui/x-data-grid-generator";

// const SGPA = [8.05, 8.86, 6.86, 6.96, 7.65];
// const CGPA = [8.05, 8.45, 7.91, 7.65, 7.65];

// const xLabels = [
//   "SEM1",
//   "SEM2",
//   "SEM3",
//   "SEM4",
//   "SEM5",
//   "SEM6",
//   "SEM7",
//   "SEM8",
// ];

// function Academic() {
//   // const { data, loading } = useDemoData({
//   //   dataSet: "Commodity",
//   //   rowLength: 100,
//   //   editable: true,
//   //   visibleFields: [
//   //     "commodity",
//   //     "quantity",
//   //     "filledQuantity",
//   //     "status",
//   //     "isFilled",
//   //     "unitPrice",
//   //     "unitPriceCurrency",
//   //     "subTotal",
//   //     "feeRate",
//   //     "feeAmount",
//   //     "incoTerm",
//   //   ],
//   // });
//   // const apiRef = useGridApiRef();

//   // const initialState = useKeepGroupedColumnsHidden({
//   //   apiRef,
//   //   initialState: {
//   //     ...data.initialState,
//   //     rowGrouping: {
//   //       ...data.initialState?.rowGrouping,
//   //       model: ["commodity"],
//   //     },
//   //     sorting: {
//   //       sortModel: [{ field: "__row_group_by_columns_group__", sort: "asc" }],
//   //     },
//   //     aggregation: {
//   //       model: {
//   //         quantity: "sum",
//   //       },
//   //     },
//   //   },
//   // });
//   return (
//     <div className="resultBar">
//       <h1>
//         <b>Semester-Wise Performance</b>
//       </h1>
//       <BarChart
//         width={500}
//         height={300}
//         series={[
//           { data: SGPA, label: "SGPA", id: "pvId" },

//           { data: CGPA, label: "CGPA", id: "uvId" },
//         ]}
//         xAxis={[{ data: xLabels, scaleType: "band" }]}
//       />
//       {/* <Box sx={{ height: 520, width: "100%" }}>
//         <DataGridPremium
//           {...data}
//           apiRef={apiRef}
//           loading={loading}
//           disableRowSelectionOnClick
//           initialState={initialState}
//           slots={{ toolbar: GridToolbar }}
//         />
//       </Box> */}
//     </div>
//   );
// }

// export default Academic;
