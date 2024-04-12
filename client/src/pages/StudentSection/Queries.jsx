import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAllQueries,
  initialLoadUser,
} from "../../redux/actions/studentSection";
const Queries = ({
  studentsection: { queries },
  getAllQueries,
  initialLoadUser,
}) => {
  useEffect(() => {
    initialLoadUser();
    getAllQueries();
    //   console.log(queries);
  }, [queries]);
  // const [newQueries, setNewQueries] = useState();
  const handleDelete = (record) => {
    // console.log(record);
    const newQueries = queries.filter((rec) => rec._id == record._id);
    // queries = newQueries;
  };
  return (
    <div>
      <h1 className="p-2">Queries from student</h1>
      <div className="p-4 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
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
                Query Type
              </th>
              <th scope="col" className="px-6 py-3">
                Query
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3" colSpan="2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {queries?.map((query, index) => (
              <tr className="bg-white border-b " key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-black"
                >
                  {query.from}
                </th>

                <td className="px-6 py-4"> {query.type}</td>

                <td className="px-6 py-4"> {query.query}</td>
                <td className="px-6 py-4"> {query.date}</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => handleDelete(query)}
                    className="ml-2 font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
Queries.propTypes = {
  getAllQueries: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  studentsection: state.studentsection,
});
export default connect(mapStateToProps, { getAllQueries, initialLoadUser })(
  Queries
);
