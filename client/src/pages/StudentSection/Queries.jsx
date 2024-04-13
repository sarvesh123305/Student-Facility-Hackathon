import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
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
  const [newQueries, setNewQueries] = useState(queries);
  // useEffect(() => {
    // setNewQueries(queries)
  // }, [queries])

  const handleDelete = async (record) => {
    console.log(record);
    // console.log(record.messageId)
    // var query = NaN
    // for(var i = 0; i < queries.length; i++)
    //   if(queries[i]._id == record._id){
    //       query = queries[i]
    //   } 

    // if(query = NaN  )
    //     return  // error query to delete not found
    const response = await axios.delete(`/api/studentsection/queries/${record}`);

    // const updatedQueries = queries.filter((rec) => rec._id == record._id);
    // setNewQueries(updatedQueries)
  };

  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [reply, setReply] = useState({rep: ""});
  const handleReply = (record) => {
    setSelectedQuery(queries);
    setShowReplyPopup(true);
  };

    const {rep} = reply
  const closeReplyPopup = () => {

    

    setShowReplyPopup(false);
    setReply("");
  }; // Define the onClose function

  const SubmitReplyPopup = () => {
    console.log("Reply: ", reply);
    setShowReplyPopup(false);
  }; // Define the onClose function

    const handleReplyUpdate = (e) => {
      setReply(e.target.value)
    }

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
                  <button
                    href="#"
                    onClick={() => handleReply(query)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleDelete(query.messageId)}
                    className="ml-2 font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showReplyPopup && (
  // <ReplyPopup
  //   query={selectedQuery?.query} // Access query from selectedQuery state
  //   onClose={() => setShowReplyPopup(false)}
  //   onSubmit={() => {
  //     // Implement logic to submit reply to backend (using selectedQuery)
  //     setShowReplyPopup(false);
  //   }}
  // />
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-5 shadow-md">
        <h2 className="text-lg font-medium mb-2">Reply to Query</h2>
        <input
          type="textarea"
          name="rep"
          value={rep}
          onChange={handleReplyUpdate}
          className="w-full rounded-md border p-2"
          // defaultValue={queries}
          style={{ width: "500px", height: "250px" }}
          autoFocus
        />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mr-2"
            onClick={() => closeReplyPopup()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            onClick={() => SubmitReplyPopup()}
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
)}
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
