import React from "react";

const Queries = () => {
  return (
    <div>
      <h1 className="p-2">Queries from student</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-black bg-slate-950">
          <thead
            className="text-xs text-white uppercase"
            style={{ backgroundColor: "#17324E" }}
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                From
              </th>

              <th scope="col" className="px-6 py-3">
                Query
              </th>
              <th scope="col" className="px-6 py-3">
                Query Type
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black"
              >
                221313
              </th>

              <td className="px-6 py-4">preference</td>

              <td className="px-6 py-4">7.76</td>
              <td className="px-6 py-4">7.76</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Queries;
